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
import { UserController } from "./presentation/controllers/user.controller";
import { SpTransController } from "./presentation/controllers/sptrans.controller";
import { SpTransHttpGateway } from "./infra/gateways/sptrans.gateway";
import { TrainStatusController } from "./presentation/controllers/train-status.controller";
import { TrainStatusFirestoreRepository } from "./infra/repositories/train-status.repository";
import { googleApiRoutes } from "./presentation/routes/google.route";
import { trensStatusRoute } from "./presentation/routes/trens-status.route";
import { sptransRoutes } from "./presentation/routes/sptrans.route";
import { UserRepositoryFirestore } from "./infra/repositories/user.repository";
import { findNearestStopRoutes } from "./presentation/routes/find-nearest.route";
import { FindNearestStopController } from "./presentation/controllers/find-nearest-stop.controller";
import { FindNearestStopUseCase } from "./application/usecases/FindNearestStopUseCase";
import { GeoRepository } from "./infra/repositories/geo.repository";
import dotenv from "dotenv";
import { createSupabaseClient } from "./infra/clients/supabase.client";

dotenv.config();
const googleController = new GoogleApiController(new HttpGoogleApiGateway());
const userController = new UserController(new UserRepositoryFirestore());
const spTransController = new SpTransController(new SpTransHttpGateway());
const trensController = new TrainStatusController(new TrainStatusFirestoreRepository());
const supabase = createSupabaseClient();
const findNearestController = new FindNearestStopController(
  new FindNearestStopUseCase(new GeoRepository(supabase))
);

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

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
      trensStatusRoute(instance, trensController);
      done();
    });
    await app.register((instance, opts, done) => {
      sptransRoutes(instance, spTransController);
      done();
    });

    const port = parseInt(process.env.PORT || "8080", 10);
    if (isNaN(port)) {
      throw new Error("Invalid port number");
    }

    await app.listen({ port, host: "0.0.0.0" });
    app.log.info(`🚀 Server running on port ${port}`);

    await app.ready();
  } catch (err) {
    app.log.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();