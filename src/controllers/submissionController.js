import { createSubmissionService } from "../services/submission-service.js";

async function createSubmissionController(request, reply) {
  const { fastify } = request;

  try {
    const { payload } = request.body;

    const { job, newSubmission } = await createSubmissionService(fastify, payload);

    reply.code(200).send({
      message: "Job successfully submitted to queue",
      jobId: job.id,
      queueName: job.queue.name,
    });
  } catch (error) {
    fastify.log.error('Failed to submit job:', error);
    reply.code(500).send({ message: 'Failed to submit job due to an internal server error.' });
  }
}

export { createSubmissionController };