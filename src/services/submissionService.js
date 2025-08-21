async function createSubmission(fastify, payload) {
  const { submission } = fastify.queues;

  const job = await submission.add("process-submission", {
    payload,
  });

  return job;
}

export { createSubmission };
