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
import { supabase } from "./infra/clients/supabase.client";

const googleController = new GoogleApiController(new HttpGoogleApiGateway());
const userController = new UserController(new UserRepositoryFirestore());
const spTransController = new SpTransController(new SpTransHttpGateway());
const trensController = new TrainStatusController(
  new TrainStatusFirestoreRepository()
);
const findNearestController = new FindNearestStopController(
  new FindNearestStopUseCase(new GeoRepository(supabase))
);

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyEnv, {
  dotenv: true,
  schema,
});

app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Whatlas API",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register((app, _, done) => {
  googleApiRoutes(app, googleController);
  done();
});

app.register((app, _, done) => {
  findNearestStopRoutes(app,findNearestController);
  done();
});

app.register((app, _, done) => {
  userRoutes(app, userController);
  done();
});

app.register((app, _, done) => {
  trensStatusRoute(app, trensController);
  done();
});

app.register((app, _, done) => {
  sptransRoutes(app, spTransController);
  done();
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

const port = Number(process.env.PORT || 8080);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 Server running on port ${port}`);
});
