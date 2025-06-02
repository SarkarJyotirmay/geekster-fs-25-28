const createJob = (req, res) => {
    // Business logic here
    res.json({
        success: true,
        message: "Create job api"
    })
};

const listJob = (req, res) => {
    res.json({
        success: true,
        message: "List job api"
    });
};

const editJob = (req, res) => {
    res.json({
        success: true,
        messgage: "Edit job api"
    })
};

const deleteJob = (req, res) => {
    res.json({
        success: true,
        message: "Delete job api"
    })
};

const jobController = {
    createJob,
    listJob,
    editJob,
    deleteJob
};

module.exports = jobController;