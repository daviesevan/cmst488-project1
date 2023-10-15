// TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)
const path = require("path");
const port = 8000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

// Import resources for API
const resources = require("./models/resources");

// Create error handling / response
const sendErrorResponse = () => {
  return (req, res) => {
    // httpStatus.NOT_FOUND is deprecated so I went with this
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end(`<h1>Resource not found</h1>`);
  };
};

// Create Web Server
const server = http.createServer(function (req, res) {
  // Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
    // TODO: Implement healthcheck code here
    // httpStatus.OK is deprecated so I went with this
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ data: "Server is healthy!" }));
  }

  // Implement static file system and serve /views/index.html
  // ** OPTIONAL: Setup dynamic reading and serving of other static files (Hint: see lesson 6.1 Wexxler)
  else if (req.url === "/views/index.html") {
    fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
      if (error) {
        sendErrorResponse()(req, res);
      }
      // TODO: Implement res.writehead to send header information - 200 response content type html
      // httpStatus.OK is deprecated 
      res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html",
      });
      // TODO: Implement res.end to send data
      res.end(data);
    });
  }

  // Add a basic api to serve resources.js
  else if (req.url == "/api/resources") {
    // TODO: Implement res.writeHead to send httpStatus.OK with JSON content type
    // httpStatus.OK is deprecated
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    // TODO: Implement res.end and use JSON.stringify to return resources
    res.end(JSON.stringify(resources));
  } else {
    sendErrorResponse()(req, res); // Call the closure here
  }
});

server.listen(port); // listen for any incoming requests;

console.log(`The server has started and is listening on port number: ${port}`);
