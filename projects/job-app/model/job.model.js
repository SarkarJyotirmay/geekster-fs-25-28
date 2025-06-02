const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title: {
        type: String
    },
    location: {
        type: String
    },
    minExp: {
        type: Number
    },
    salary: {
        type: Number
    },
    description: {
        type: String
    },
    company: {
        type: String
    },
    skills: {
        type: [String]
    }
});

const JobModel = mongoose.model("jobs", jobSchema);

module.exports = JobModel;