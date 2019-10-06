import fs = require("fs");
import http = require("http");
import path = require("path");

export default class {

    public static startServer(httpPort: number = 8080) {
        http.createServer((request, response) => {

            let filePath = "./html" + this.getPathFromUrl(request.url);
            if (filePath === "./html/") {
                filePath = "./html/index.htm";
            }

            const extname = path.extname(filePath);
            let contentType = "text/html";
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

            fs.readFile(filePath, (error, content) => {
                if (error) {
                    if (error.code === "ENOENT") {
                        fs.readFile("./html/404.html", (error404, content404) => {
                            response.writeHead(404, { "Content-Type": contentType });
                            response.end(content, "utf-8");
                        });
                    } else {
                        response.writeHead(500);
                        response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
                        response.end();
                    }
                } else {
                    response.writeHead(200, { "Content-Type": contentType });
                    response.end(content, "utf-8");
                }
            });

        }).listen(httpPort);
    }

    private static getPathFromUrl(url: string|undefined) {
        if (typeof(url) === undefined || url === null) {
            return null;
        }

        // @ts-ignore
        return url.split("?")[0];
    }
}
