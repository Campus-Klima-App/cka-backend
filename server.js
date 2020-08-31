const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

var express  = require('express');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var backend = 'http://10.50.50.205:80',
    frontend = 'http://10.50.50.205:26026';

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
