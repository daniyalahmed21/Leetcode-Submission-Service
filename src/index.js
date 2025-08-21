import Fastify from "fastify";
import App from "./app.js";
import fastifyEnv from "@fastify/env";
import schema from "./config/serverConfig.js";

const fastify = Fastify({
  logger: true,
});

const options = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

const start = async () => {
  try {
    await fastify.register(fastifyEnv, options);

    await fastify.register(redisPlugin, {
      host: fastify.config.REDIS_HOST,
      port: fastify.config.REDIS_PORT,
      maxRetriesPerRequest: null,
    });

    await fastify.register(App);

    const port = fastify.config.PORT || 3000;

    await fastify.listen({ port });

    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
