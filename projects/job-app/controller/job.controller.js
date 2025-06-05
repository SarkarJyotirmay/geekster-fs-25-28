const JobModel = require("../model/job.model");

const createJob = async (req, res) => {
    // To save the job in DB
    // if(!req.body.skiils) {
    //     // throw error
    // }
    try {
        console.log(req.body);
        await JobModel.create(req.body); // Create a new doc in jobs collection
        res.json({
            success: true,
            message: "Job created successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Invalid data"
        })
    }
};

const listJob = async (req, res) => {
    const minSalary = req.query.minSalary || 0;
    console.log(minSalary);
    const jobs = await JobModel.find({
        salary: {
            $gte: minSalary
        }
    });

    res.json({
        success: true,
        message: "List job api",
        results: jobs
    });
};

const editJob = async (req, res) => {
    console.log(req.body);
    // await JobModel.updateOne({
    //     _id: req.body._id
    // }, {
    //     $set: {
    //         ...req.body
    //     }
    // });
    const fields = { ...req.body };
    delete fields._id;

    await JobModel.findByIdAndUpdate(req.body._id, { ...fields });
    res.json({
        success: true,
        messgage: "Edit job api"
    })
};

const deleteJob = async (req, res) => {
    // if(req.body._id == undefined) {

    // }
    // await JobModel.deleteOne({ _id: req.body._id });
    // await JobModel.deleteMany({ _id: req.body._id });

    await JobModel.findByIdAndDelete(req.body._id);
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