import SubmissionModel from '../models/submissionModel.js';

class SubmissionRepository {
    constructor() {
        this.submissionModel = SubmissionModel;
    }

    async create(submissionData) {
        const newSubmission = await this.submissionModel.create(submissionData);
        return newSubmission;
    }
}

export default SubmissionRepository;