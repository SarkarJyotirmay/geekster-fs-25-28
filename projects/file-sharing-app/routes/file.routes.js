const express = require("express");

const fileController = require("../controllers/file.controller");
const uploader = require("../middlewares/fileUpload");

const router = express.Router();

router.post("/api/v1/file/upload", uploader.single("file"), fileController.uploadFile);

router.post("/api/v1/file/share", fileController.shareFile);

router.get("/files/:fileId", fileController.downloadFile); // To be decided later

module.exports = router;