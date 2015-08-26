/// <reference path="./typings/node/node.d.ts"/>

import http = require("http");
import fs = require("fs");
import path = require("path");
import querystring = require("querystring");
import util = require("util");

import RequestHandler from "./requestHandler";

process.env.NODE_ENV = "development";


global.debug = function(msg) {
    (process.env.NODE_ENV === "development") && console.log(msg);
}



class Server extends RequestHandler {
    private _port: number;
    private _folder = "./../public/";

    constructor(port: number) {
        super();
        this._port = port;
    }

    private _onReq = (req, resp) => {
        let method = req.method;
        if (method === "POST") {
            this.getPostData(req, resp);
        }
        else if (method === "GET") {
            let url = req.url;

            debug("url: " + url);

            switch (url) {
                case "/":
                case "/index.html":
                case "/home":
                    this.sendFile(this._folder + "index.html", resp);
                    break;
                default:
                    this.sendFile(this._folder + url, resp);
            }

        }
        else {
            this.send404("sorry", resp);
        }
    }

    startServer() {
        http.createServer(this._onReq).listen(this._port, () => {
            console.log("Server Running on Port:", this._port);
        });
    }
}

let s1 = new Server(3000);
s1.startServer();