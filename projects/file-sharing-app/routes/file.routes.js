const express = require("express");

const fileController = require("../controllers/file.controller");
const uploader = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/api/v1/file/upload", uploader.single("resume"), fileController.uploadFile);

router.post("/api/v1/file/share", fileController.shareFile);

// router.get(); // To be decided later

module.exports = router;