/// <reference path="./typings/node/node.d.ts"/>
var fs = require("fs");
var path = require("path");
var querystring = require("querystring");
var RequestHandler = (function () {
    function RequestHandler() {
    }
    RequestHandler.prototype.send404 = function (response, msg) {
        if (msg === void 0) { msg = ""; }
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/plain");
        response.write("404, Not found");
        response.end(msg);
    };
    RequestHandler.prototype.sendFile = function (fileName, response) {
        var _this = this;
        var extName = path.extname(fileName);
        debug("ext: " + extName);
        response.setHeader("Content-Type", this.getMimeType(extName));
        var file = fs.createReadStream("./" + fileName);
        file.on("error", function (e) {
            _this.send404(response, e.message);
        });
        file.pipe(response);
    };
    RequestHandler.prototype.getMimeType = function (extName) {
        var ext = null;
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
        } //switch
        return ext;
    }; //get
    RequestHandler.prototype.getPostData = function (resquest, response) {
        var data = "";
        response.setHeader("Content-Type", "text/plain");
        resquest.setEncoding = "utf-8";
        resquest.on("data", function (chunk) {
            data += chunk;
        });
        resquest.on("data", function (chunk) {
            var text = querystring.parse(data).textarea;
            response.write(text);
            response.end("\nThankyou Rehan Sir");
        });
    };
    return RequestHandler;
})();
exports.default = RequestHandler;
