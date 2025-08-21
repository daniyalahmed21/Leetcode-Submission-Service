import SubmissionRoutes from "./submissionRoutes.js";

async function v1Plugin(fastify, options) {
  fastify.register(SubmissionRoutes, { prefix: "/submission" });
}

export default v1Plugin;
