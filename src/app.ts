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
import { googleApiRoutes } from "./presentation/routes/google.route";
import { trensStatusRoute } from "./presentation/routes/trens-status.route";
import { sptransRoutes } from "./presentation/routes/sptrans.route";
import { findNearestStopRoutes } from "./presentation/routes/find-nearest.route";
import dotenv from "dotenv";
import { handleError } from "./utils/handle-error";
import { makeUserController } from "./infra/factories/user-controller.factory";
import { makeSpTransController } from "./infra/factories/sptrans-controller.factory";
import { makeTrainStatusController } from "./infra/factories/train-status.factory";
import {  tripRoutes } from "./presentation/routes/trip.route";
import { makeTripController } from "./infra/factories/trip.controller";
import { makeFindNearestStopController } from "./infra/factories/find-nearest-stop.factory";
import { makeGoogleController } from "./infra/factories/google-controller.factory";
import { makeBusController } from "./infra/factories/bus-controller.factory";
import { busRoutes } from "./presentation/routes/bus.route";

dotenv.config();

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
      dotenv: false,
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

    const googleController = makeGoogleController();
    const userController = makeUserController();
    const spTransController = makeSpTransController();
    const tripController = makeTripController();
    const busController = makeBusController();
    const findNearestController = makeFindNearestStopController();
    const trainStatusController = makeTrainStatusController();
  

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
      busRoutes(instance, busController);
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