/// <reference path="./typings/node/node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var http = require("http");
var requestHandler_1 = require("./requestHandler");
process.env.NODE_ENV = "development";
global.debug = function (msg) {
    (process.env.NODE_ENV === "development") && console.log(msg);
};
var Server = (function (_super) {
    __extends(Server, _super);
    function Server(port) {
        var _this = this;
        _super.call(this);
        this._folder = "./../public/";
        this._onReq = function (req, resp) {
            var method = req.method;
            if (method === "POST") {
                _this.getPostData(req, resp);
            }
            else if (method === "GET") {
                var url = req.url;
                debug("url: " + url);
                switch (url) {
                    case "/":
                    case "/index.html":
                    case "/home":
                        _this.sendFile(_this._folder + "index.html", resp);
                        break;
                    default:
                        _this.sendFile(_this._folder + url, resp);
                }
            }
            else {
                _this.send404("sorry", resp);
            }
        };
        this._port = port;
    }
    Server.prototype.startServer = function () {
        var _this = this;
        http.createServer(this._onReq).listen(this._port, function () {
            console.log("Server Running on Port:", _this._port);
        });
    };
    return Server;
})(requestHandler_1.default);
var s1 = new Server(3000);
s1.startServer();
