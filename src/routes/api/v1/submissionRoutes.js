import SubmissionController from "../../../controllers/submissionController.js";

async function SubmissionRoutes(fastify, options) {
  fastify.post("/", SubmissionController);
}

export default SubmissionRoutes;
