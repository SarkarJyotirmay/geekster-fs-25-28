const express = require("express");

const app = express();

app.use((req, res, next) => {
    if (req.query.apiKey == "12345abcd") {
        next();
    } else {
        res
            .status(401)
            .json({
                success: false,
                message: "Please pass apiKey in the query parameter"
            })
    }
});

app.use((req, res, next) => {
    console.log("M1");
    req.firstName = "Alexa";
    req.address = "1234 ABCD";
    // return res.json({
    //     success: true,
    //     message: "Response from M1"
    // });
    // console.log("M1 after res.json")
    next();
});

app.use((req, res, next) => {
    console.log("M2", req.firstName);
    next();
});

app.post("/login", (req, res) => {
    res.json({
        success: true,
        message: "Login API"
    })
});

app.get("/todos", (req, res, next) => {
    console.log("TODO", req.address);
    try {
        throw new Error();
        // next();
        res.json({
            success: true,
            message: "Todos API"
        });
    } catch (err) {
        console.log("ERR", err);
        next(err);
        // res.status(400).json({
        //     success: false,
        //     messge: "Error occured"
        // })
    }
});

app.get("/users", (req, res) => {
    console.log("USERS");
    res.json({
        success: true,
        message: "Users API"
    })
});

// 404 Route handler
app.use((req, res, next) => {
    res
        .status(404)
        .json({
            success: false,
            message: "Route not found"
        })
});

// Error handling middleware
app.use((err, req, res, next) => {
    // fs.appendFile("error.log", err.message)
    console.log("ERROR", err);
    res
        .status(500)
        .json({
            success: false,
            message: "Internal server error"
        });
});

app.listen(8080, () => console.log("Server is up and runnig at port 8080"));