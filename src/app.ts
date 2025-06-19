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
import fs from "fs";
import path from "path";
import { userRoutes } from "./routes/user.route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app
  .register(fastifyEnv, {
    dotenv: false,
    schema,
  })
  .ready((err) => {
    if (err) {
      console.error("❌ Failed to load env vars:", err);
      process.exit(1);
    }

    const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!credentialsJson) {
      console.error("❌ Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");
      process.exit(1);
    }

    const tempPath = path.join("/tmp", "gcp-sa.json");
    try {
      fs.writeFileSync(tempPath, credentialsJson);
      process.env.GOOGLE_APPLICATION_CREDENTIALS = tempPath;
      console.log("✅ Service account written to /tmp/gcp-sa.json");
    } catch (writeErr) {
      console.error("❌ Failed to write service account file:", writeErr);
      process.exit(1);
    }

    console.log("✅ Environment variables loaded");
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

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(userRoutes);

const port = Number(process.env.PORT || 8080);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`🚀 Server running on port ${port}`);
});
