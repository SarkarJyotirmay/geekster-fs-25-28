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

const shareFile = async (req, res) => {
    // console.log(req.body._id);
    try {
        const link = "http://localhost:8080/files/" + req.body._id;
        const file = await FileModel.findById(req.body._id);
        console.log(file);
        if (!file) {
            // File does not exists with this id
            throw new Error("Invalid file Id");
        }
        res.json({
            success: true,
            message: "File share API",
            result: link
        });
    } catch (err) {
        console.log(err);
        res
            .status(400)
            .json({
                success: false,
                message: "Invalid File Id"
            });
    }
};

const downloadFile = async (req, res) => {
    console.log(req.params.fileId);
    const file = await FileModel.findById(req.params.fileId);
    console.log(file.path);
    res.download(file.path, file.originalFileName);
    return;
};

const fileController = {
    uploadFile,
    shareFile,
    downloadFile
};

module.exports = fileController;