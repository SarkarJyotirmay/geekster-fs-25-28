import express from "express";
import { nanoid } from 'nanoid';

const app = express();

const urls = {};
// Middleware
app.use(express.urlencoded()); // Parses URL encoded data

app.get("/", (req, res) => {
    res.sendFile(import.meta.dirname + "/index.html");
});

app.post("/shorten", (req, res) => {
    console.log(req.body.longUrl);
    // console.log(nanoid(8));
    const shortUrl = nanoid(8);

    urls[shortUrl] = req.body.longUrl;

    console.log(urls);

    res.json({
        success: true,
        shortUrl: `http://localhost:8080/${shortUrl}`
    });
});

app.get("/:shortUrl", (req, res) => {
    console.log(req.params.shortUrl);

    const longUrl = urls[req.params.shortUrl];
    console.log(longUrl);
    res.redirect(longUrl);
});

app.listen(8080, () => console.log("Server is up and running at port 8080"));