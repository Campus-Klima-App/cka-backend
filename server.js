const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

//const server = http.createServer(app);

var express  = require('express');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var backend = 'http://localhost:80',
    frontend = 'http://localhost:26026';

app.all("/rest/*", function(req, res) {
    apiProxy.web(req, res, {target: backend});
});

app.all("/*", function(req, res) {
    apiProxy.web(req, res, {target: frontend});
});

var server = require('http').createServer(app);
server.on('upgrade', function (req, socket, head) {
    apiProxy.ws(req, socket, head, {target: frontend});
});

server.listen(port);
