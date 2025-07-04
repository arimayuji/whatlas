import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyEnv } from "@fastify/env";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { schema } from "./env.schema";
import { userRoutes } from "./presentation/routes/user.route";
import { GoogleApiController } from "./presentation/controllers/google.controller";
import { HttpGoogleApiGateway } from "./infra/gateways/google-api.gateway";
import { googleApiRoutes } from "./presentation/routes/google.route";
import { trensStatusRoute } from "./presentation/routes/trens-status.route";
import { sptransRoutes } from "./presentation/routes/sptrans.route";
import { findNearestStopRoutes } from "./presentation/routes/find-nearest.route";
import { FindNearestStopController } from "./presentation/controllers/find-nearest-stop.controller";
import { FindNearestStopUseCase } from "./application/usecases/FindNearestStopUseCase";
import { GeoRepository } from "./infra/repositories/geo.repository";
import dotenv from "dotenv";
import { createSupabaseClient } from "./infra/clients/supabase.client";
import { handleError } from "./utils/handle-error";
import { makeUserController } from "./infra/factories/user-controller.factory";
import { makeSpTransController } from "./infra/factories/sptrans-controller.factory";
import { makeTrainStatusController } from "./infra/factories/train-status.factory";
import {  tripRoutes } from "./presentation/routes/trip.route";
import { makeTripController } from "./infra/factories/trip.controller";

dotenv.config();
const googleController = new GoogleApiController(new HttpGoogleApiGateway());
const userController = makeUserController();
const spTransController = makeSpTransController();
const tripController = makeTripController();

const trainStatusController = makeTrainStatusController();
const supabase = createSupabaseClient();
const findNearestController = new FindNearestStopController(
  new FindNearestStopUseCase(new GeoRepository(supabase))
);

const app = fastify({
  logger: {
    level: 'info',
  },}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const start = async () => {
  try {
    await app.register(fastifyEnv, {
      confKey: "config",
      schema,
      dotenv: true,
    });
    app.log.info("Environment variables loaded");

    await app.register(fastifyCors, { origin: "https://your-allowed-domain.com" });

    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: "Whatlas API",
          version: "1.0.0",
        },
        servers: [{ url: `http://localhost:${process.env.PORT || 8080}` }],
      },
      transform: jsonSchemaTransform,
    });

    await app.register(fastifySwaggerUi, { routePrefix: "/docs" });

    await handleError(app);

    await app.register((instance, opts, done) => {
      googleApiRoutes(instance, googleController);
      done();
    });

    await app.register((instance, opts, done) => {
      findNearestStopRoutes(instance, findNearestController);
      done();
    });

    await app.register((instance, opts, done) => {
      userRoutes(instance, userController);
      done();
    });

    await app.register((instance, opts, done) => {
      trensStatusRoute(instance, trainStatusController);
      done();
    });

    await app.register((instance, opts, done) => {
      sptransRoutes(instance, spTransController);
      done();
    });

    await app.register((instance, opts, done) => {
      tripRoutes(instance, tripController);
      done();
    })

    const port = parseInt(process.env.PORT || "8080", 10);

    if (isNaN(port)) {
      throw new Error("Invalid port number");
    }

    app.addHook('onResponse', (req, res, done) => {
      const status = res.statusCode;
      if (status >= 200 && status < 300) {
        req.log.info({
          method: req.method,
          url: req.url,
          status,
          duration: res.elapsedTime,
        }, 'request_success');
      }
      done();
    });

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🚀 Server running on port ${port}`);

    await app.ready();
  } catch (err) {
    app.log.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();