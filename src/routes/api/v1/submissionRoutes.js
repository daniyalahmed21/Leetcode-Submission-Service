import createJobController from "../../../controllers/submissionController.js";

async function SubmissionRoutes(fastify, options) {
  fastify.post("/submit-job", createJobController);
}

export default SubmissionRoutes;
