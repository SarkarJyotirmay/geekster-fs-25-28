const express = require("express");
const responseTime = require("response-time");

const app = express();

// Middlewares
app.use(express.static(__dirname + "/img"));
app.use(express.json());
app.use(express.urlencoded());

app.use(responseTime());

const usersList = [
    {
        id: 1,
        name: "Alex",
        profileImage: "/sample.png"
    },
    {
        id: 2,
        name: "Peter",
        profileImage: "/sample.png"
    }
];

app.get("/users", (req, res) => {
    res.json({
        success: true,
        results: usersList
    })
});


app.post("/register", (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
        message: "Dummy Registration API"
    })
});

app.listen(8080, () => console.log("Server is up and runnig at port 8080"));