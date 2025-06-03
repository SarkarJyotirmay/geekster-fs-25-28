const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minExp: {
        type: Number,
        default: 0
    },
    salary: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true,
    }
});

const JobModel = mongoose.model("jobs", jobSchema);

module.exports = JobModel;