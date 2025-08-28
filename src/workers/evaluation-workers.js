import { Worker } from "bullmq";

export default async function evaluationQueueWorker(fastify, options) {
  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        console.log(job.data);
      }
    },
    { connection: fastify.redis }
  );
}
