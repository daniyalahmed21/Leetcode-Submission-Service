async function createSubmissionService(fastify, payload) {
  const { submission } = fastify.queues;
  const { submissionRepository } = fastify;

  const newSubmission = await submissionRepository.create(payload);

  const job = await submission.add("process-submission", {
    submissionId: newSubmission._id,
    payload,
  });

  return { job };
}

export { createSubmissionService };
