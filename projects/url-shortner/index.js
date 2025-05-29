import express from "express";
import { nanoid } from 'nanoid';
import fs from "node:fs";

const app = express();

const isUrlValid = (url) => {
    try {
        new URL(url)
        return true;
    } catch (err) {
        return false
    }
};

// Middleware
app.use(express.urlencoded()); // Parses URL encoded data
// import.meta.dirname (ESM) => __dirname (CJS)
app.get("/", (req, res) => {
    res.sendFile(import.meta.dirname + "/index.html");
});

app.post("/shorten", (req, res) => {
    // console.log(req.body.longUrl);
    // console.log(nanoid(8));
    if (!isUrlValid(req.body.longUrl)) {
        res.status(400).json({
            success: false,
            message: "Inavlid URL"
        });
        return;
    }
    const shortUrl = nanoid(8);

    // console.log(urls);
    const fileData = fs.readFileSync("urls.json");
    const urlsFromFile = JSON.parse(fileData.toString());
    urlsFromFile[shortUrl] = req.body.longUrl;

    fs.writeFileSync("urls.json", JSON.stringify(urlsFromFile));
    // console.log(urlsFromFile)
    // fs.appendFileSync();

    res.json({
        success: true,
        shortUrl: `http://localhost:8080/${shortUrl}`
    });
});

app.get("/:shortUrl", (req, res) => {
    console.log(req.params.shortUrl);
    const fileData = fs.readFileSync("urls.json");
    const urlsFromFile = JSON.parse(fileData.toString());

    const longUrl = urlsFromFile[req.params.shortUrl];
    // console.log(longUrl);
    res.redirect(longUrl);
});

app.listen(8080, () => console.log("Server is up and running at port 8080"));