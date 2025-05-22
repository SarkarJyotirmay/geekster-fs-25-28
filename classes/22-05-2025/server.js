// console.log("server.js");
const http = require("node:http");

const dummyUsersData = {
    result: [
        {
            userid: 1,
            name: "Peter"
        },
        {
            userid: 2,
            name: "Tony"
        }
    ]
}

const dummyTodosData = {
    result: [
        {
            todoid: 1,
            title: "Lorem ipsum dor sit amet"
        }
    ]
}

const serverFn = (req, res) => {
    console.log(req.url);
    console.log("Request received");


    if (req.url == "/todos") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(dummyTodosData));
    } else if (req.url == "/users") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify(dummyUsersData))
    } else {
        res.writeHead(404, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify({
            result: []
        }))
    }

};

const server = http.createServer(serverFn);

server.listen(5173, () => console.log("Server is up and running at port 8080"));