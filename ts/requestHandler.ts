/// <reference path="./typings/node/node.d.ts"/>

import http = require("http");
import fs = require("fs");
import path = require("path");
import querystring = require("querystring");
import util = require("util");



export default class RequestHandler {
    send404(response, msg = "") {
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/plain");
        response.write("404, Not found");
        response.end(msg);
    }

    sendFile(fileName: string, response) {
        let extName = path.extname(fileName);

        debug("ext: " + extName);

        response.setHeader("Content-Type", this.getMimeType(extName));
        let file = fs.createReadStream("./" + fileName);
        file.on("error", (e: Error) => {
            this.send404(response, e.message);
        })
        file.pipe(response);
    }
    getMimeType(extName: string) {
        let ext = null;
        switch (extName) {
            case ".html":
                ext = "text/html";
                break;
            case ".css":
                ext = "text/css";
                break;
            case ".js":
                ext = "application/javascript";
                break;
            default:
                ext = "text/plain";
        }//switch
        return ext;

    }//get

    getPostData(resquest, response) {
        let data = "";
        response.setHeader("Content-Type", "text/plain");
        resquest.setEncoding = "utf-8";

        resquest.on("data", function(chunk) {
            data += chunk;
        });

        resquest.on("data", function(chunk) {
            let text = querystring.parse(data).textarea;

            response.write(text);
            response.end("\nThankyou Rehan Sir");


        });

    }
}

