import fastifyPlugin from "fastify-plugin";
import redisPlugin from "./config/redisConfig.js";
import submissionQueuePlugin from "./queues/submissionQueue.js";
import apiPlugin from "./routes/api/apiRoutes.js";

async function appRootPlugin(fastify, options) {
  await fastify.register(redisPlugin, {
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
    maxRetriesPerRequest: null,
  });

  await fastify.register(submissionQueuePlugin);

  await fastify.register(mongooseDB, {
    mongoURI: fastify.config.MONGO_URI
  });

  await fastify.register(apiPlugin, { prefix: "/api" });
}

export default fastifyPlugin(appRootPlugin);
