const express = require("express");
const rand = require("./randomNumber");
const url = require("url");
const fs = require("fs");

const server = express();

server.get("/", function (req, res){
    // var filePath = "/about.html";
    // var reqUrl = __dirname + "/static/apple-html-css-replica" +filePath;
    // fs.readFile(reqUrl, function (err, content) {
    //     if(err){
    //         res.sendStatus(404);
    //     }
    //     else{
    //         res.end(content);
    //     }
    // });

    var randomValue = rand.random();
    res.send("<h1>Request received and processed</h1>\nRandom number is:" + randomValue);
    
    
});
server.get("/about.html", function (req, res){
    let filePath = req.url;
    let reqUrl = __dirname + "/static/apple-html-css-replica" + filePath
    fs.readFile(reqUrl, (err, data)=>{
        if(err){
            res.sendStatus(404);
        }
        else{
        res.end(data);
        }
    });
});

server.use("/index.html", express.static("static/apple-html-css-replica"));// output the apple static page

server.listen(1233, function (err) {
    if (err) {
        console.log("Error running server");
    } else {
        console.log("Server running");
    }
})

