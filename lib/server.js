"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var http = require("http");
var path = require("path");
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.startServer = function (httpPort) {
        var _this = this;
        if (httpPort === void 0) { httpPort = 8080; }
        http.createServer(function (request, response) {
            console.log("request starting: " + request.url);
            var filePath = "./html" + _this.getPathFromUrl(request.url);
            if (filePath === "./html/") {
                filePath = "./html/index.htm";
            }
            console.log(filePath);
            var extname = path.extname(filePath);
            var contentType = "text/html";
            switch (extname) {
                case ".js":
                    contentType = "text/javascript";
                    break;
                case ".css":
                    contentType = "text/css";
                    break;
                case ".json":
                    contentType = "application/json";
                    break;
                case ".png":
                    contentType = "image/png";
                    break;
                case ".jpg":
                    contentType = "image/jpg";
                    break;
                case ".wav":
                    contentType = "audio/wav";
                    break;
                case ".ttf":
                    contentType = "font/ttf";
                    break;
            }
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    if (error.code === "ENOENT") {
                        console.log(filePath + " - 404");
                        fs.readFile("./html/404.html", function (error404, content404) {
                            response.writeHead(404, { "Content-Type": contentType });
                            response.end(content, "utf-8");
                        });
                    }
                    else {
                        console.log(filePath + " - 500");
                        response.writeHead(500);
                        response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
                        response.end();
                    }
                }
                else {
                    console.log(filePath + " - outputting");
                    response.writeHead(200, { "Content-Type": contentType });
                    response.end(content, "utf-8");
                }
            });
        }).listen(httpPort);
        console.log("Server running at http://127.0.0.1:" + httpPort + "/");
    };
    default_1.getPathFromUrl = function (url) {
        if (typeof (url) === undefined || url === null) {
            return null;
        }
        // @ts-ignore
        return url.split("?")[0];
    };
    return default_1;
}());
exports.default = default_1;
