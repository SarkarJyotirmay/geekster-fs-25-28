const express = require("express");

const jobController = require("../controller/job.controller");

const router = express.Router();

router.post("/create", jobController.createJob);

router.get("/list", jobController.listJob);

router.patch("/edit", jobController.editJob);

router.delete("/delete", jobController.deleteJob);

module.exports = router;