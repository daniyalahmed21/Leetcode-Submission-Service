import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User id for the submission is missing"],
  },
  problemId: {
    type: String,
    required: [true, "Problem id for the submission is missing"],
  },
  code: {
    type: String,
    required: [true, "Code for the submission is missing"],
  },
  language: {
    type: String,
    required: [true, "Language for the submission is missing"],
  },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "ERROR", "TLE", "MLE", "WA"],
    default: "PENDING",
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
