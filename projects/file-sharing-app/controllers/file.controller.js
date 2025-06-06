const FileModel = require("../models/file.model");

const uploadFile = async (req, res) => {
    console.log(req.file);
    await FileModel.create({
        originalFileName: req.file.originalname,
        modifiedFileName: req.file.filename,
        size: req.file.size,
        user: req.body.userName,
        path: req.file.path
    });
    res.json({
        success: true,
        message: "File uploaded successfully"
    })
};

const shareFile = (req, res) => {
    res.json({
        success: true,
        message: "File share API"
    });
};

const fileController = {
    uploadFile,
    shareFile
};

module.exports = fileController;