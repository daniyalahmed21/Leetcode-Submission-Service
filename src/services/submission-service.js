import { fetchProblemDetails } from "../apis/problem-service-api.js";

export async function createSubmissionService(fastify, payload) {
  try {
    const { submission } = fastify.queues;
    const { submissionRepository } = fastify;

    // ✅ fetch problem details (codeStubs, testcases, etc.)
    const problem = await fetchProblemDetails(payload.problemId);

    // Combine code stubs + user code
    const stub = problem.codeStubs.find((c) => c.language === payload.language);
    if (!stub) {
      throw new Error(`No code stub found for language: ${payload.language}`);
    }

    const fullCode = `
${stub.startSnippet}
${payload.code}  
${stub.endSnippet}
`;

    // Save submission with fullCode
    const newSubmission = await submissionRepository.create({
      ...payload,
      code: fullCode,
    });

    console.log("Problem details:", problem);
    const firstTestcase = problem.testcases[0] ?? { input: "", output: "" };

    const job = await submission.add("process-submission", {
      submissionId: newSubmission._id,
      problemId: payload.problemId,
      code: fullCode,
      language: payload.language,
      inputTestCase: firstTestcase.input,
      outputTestCase: firstTestcase.output,
    });


    return { job };
  } catch (err) {
    console.error("Error in createSubmissionService:", err);
    throw err;
  }
}
