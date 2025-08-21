import { createSubmissionController } from "../../../controllers/submissionController.js";

async function SubmissionRoutes(fastify, options) {
  fastify.post("/submit-job", createSubmissionController);
}

export default SubmissionRoutes;
