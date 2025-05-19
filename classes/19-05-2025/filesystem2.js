const fs = require("node:fs");
const path = require("node:path");
const childProcess = require("node:child_process");

const nodeWifi = require("node-wifi");


const deleteFile = async () => {
    const fileExists = fs.existsSync("sample.txt");
    console.log("fileExists", fileExists)
    if (fileExists) {
        fs.unlink("sample.txt", (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("File deleted successfully");
        });
        // try {
        //     fs.unlink("smaple.txt");
        //     console.log(result)
        // } catch (err) {
        //     console.log("ERROR DELETING FILE", err);
        // }
    }
};

// deleteFile();

// D:\Divyansh\Classes\fs-25-28\module_6\classes\17-05-2025
// console.log(`${__dirname}../17-05-2025`);
// console.log(__filename);
const joinedPath = path.join(__dirname, "../", "17-05-2025", "sample.mp3")
// console.log(path.parse(joinedPath))
console.log(path.extname(joinedPath))
// fs.unlink(joinedPath, (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("File deleted successfully");
// })
// console.log(joinedPath);


const userDetails = [
    {
        id: 1,
        name: "John"
    },
    {
        id: 2,
        name: "Oliver"
    }
];
// const data = {
//     name: "my-project",
//     version: "1.0.0",
//     dependencies: {
//         "axios": "^1.0.0",
//         "react": "^18.5.2"
//     }
// }
// fs.writeFile("userdata.json", JSON.stringify(userDetails), (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("File created successfully");
// })

// childProcess.exec("start calc");

nodeWifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

nodeWifi.scan((error, networks) => {
    if (error) {
        console.log(error);
    } else {
        console.log(networks);
    }
});