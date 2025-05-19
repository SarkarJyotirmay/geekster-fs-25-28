const { create } = require("node:domain");
const fs = require("node:fs"); // CJS

/**
 * Creating a file
 * fs.writeFile("filename","file conents", callbackFn)
 */
const createFile = () => {
    const fileName = "sample.txt";
    const fileContents = "Hi Nodejs";

    const fileCb = (err) => {
        if (err) {
            console.log("ERROR CREATING FILE", err);
            return;
        }
        console.log("File created successfully")
    };

    fs.writeFile(fileName, fileContents, fileCb)
}

// createFile();

/**
 * Read a file
 * fs.readFile("filename",callbackFn)
 */
const readFile = () => {
    fs.readFile("sample.txt", (err, data) => {
        if (err) {
            console.log("ERROR READING FILE", err);
            return;
        }
        let fileData = data.toString();
        console.log(data.toString())
    });
}

/**
 * Edit Operation
 * 
 */

const editFile = () => {
    const fileContents = "\nContent Line 5";
    fs.appendFile("sample.txt", fileContents, (err) => {
        if (err) {
            console.log("ERROR APPENDING DATA TO FILE", err);
            return;
        }
        console.log("FILE APPENDED SUCCESSFULLY");
    });
};

// editFile();

const smartEditFile = () => {
    /**
     * 1. Read the file fs.readFile()
     * 2. Modify the data read from the file
     * 3. Write the file with modified data using fs.WriteFile()
     */

    // fs.readFile("sample.txt", (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return;
    //     }
    //     const data = data.toString();
    //     // Todo : Write your logic to change your data
    //     const updatedData = data.substring(0, 10) + "NEW DATA" + data.substring(10, data.length - 1)
    //     fs.writeFile("smaple.txt", updatedData, (err) => {
    //         if (err) {
    //             console.log(err)
    //             return;
    //         }
    //         console.log("File edited successfully")
    //     })
    // })

    try {
        const data = fs.readFileSync("sample.txt");
        const updatedData = data.substring(0, 10) + "NEW DATA" + data.substring(10, data.length - 1);
        fs.writeFileSync("sample.txt", updatedData);
    } catch (err) {
        console.log("ERROR IN FILE OPERATION", err);
    }
}

const data = {
    name: "my-project"
}

// fs.writeFile("user.json", JSON.stringify(data), (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("File written successfully")
// })

