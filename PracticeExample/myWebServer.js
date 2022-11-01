const http = require("http");
const url = require("url");
const fs = require("fs");
const mime = require("mime-types").lookup;
const rand = require("./randomNumber");


const server = http.createServer(function (req, res) {

    var filePath = url.parse(req.url, true);// get the requested url as an object
    var exactFilePath = filePath.path;// get the exact path from the requested object
    console.log(exactFilePath);
    var reqUrl;

    if (exactFilePath == "/") {
        var randomValue = rand.random();
        res.end("<h1>Request received and processed</h1>\nRandom number is:" + randomValue);
    }
    else if (exactFilePath == "/about.html") {
        reqUrl = __dirname + "/static/apple-html-css-replica" + exactFilePath;// construct the whole url using the exact path

        fs.readFile(reqUrl, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end();
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
    else {
        reqUrl = __dirname + "/static/apple-html-css-replica/" + exactFilePath;


        fs.readFile(reqUrl, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end();
            }
            else {
                // res.writeHead(200, {"content-type":"text/html"});// output only html & text contents
                res.writeHead(200, {"Content-type" : mime(exactFilePath)});// with mime(output every content)
                res.end(data);
            }
        });
    }
});

server.listen(1213, function (err) {
    if (err) {
        console.log("Error running server")
    } else {
        console.log("Server running")
    }
})
