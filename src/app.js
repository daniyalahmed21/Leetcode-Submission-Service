import fp from "fastify-plugin";
import redisPlugin from "./plugins/redis.js";
import submissionQueuePlugin from "./plugins/submission-queue.js";
import mongooseDB from "./plugins/mongoose-db.js";
import repositoryPlugin from "./plugins/repository.js";
import servicePlugin from "./plugins/service.js";
import submissionRoutes from "./routes/submission-routes.js";

async function appRootPlugin(fastify, options) {
  await fastify.register(mongooseDB, {
    mongoURI: fastify.config.MONGO_URI,
  });
  await fastify.register(repositoryPlugin);

  await fastify.register(redisPlugin, {
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
    maxRetriesPerRequest: null,
  });
  await fastify.register(submissionQueuePlugin);

  await fastify.register(servicePlugin);

  await fastify.register(submissionRoutes);
}

export default fp(appRootPlugin);
