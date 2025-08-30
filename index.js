/* CS55-13_F25-Week-01-HE */
   

/*CS55_13_F25_Week02-HC Helen Chen CS55.13 Module 02*/

/*Define a variable and place into it the http package(shared code) from node.js */
const myhttp = require('http');

//Load the core Node filesystem (fs) module, using javescript promises instead of callbacks
const fs = require("fs").promises;

// Create a function to respond to http requests
const requestListener =  function( myrequest, myresponse ) {
            console.log( myrequest.url );
            
            if ( myrequest.url === "/" ) {
                // Check request url, if root, return html file
                /* Special variable double underscore '__dirname' has absolute path of where node code is running
                    Inside Node.js readFile __dirname has current directory name then append the file path*/
                fs.readFile(__dirname + "/page.html").then(
                    // function(contents) {} is equivalent to:
                     /* writeHead() creates an http response header, including the status code (200 OK), the content type
                        myresponse.writeHead( 200, { "Content-Type": "text/plain" } );*/
                    // MIME type: is either text/html or application/json
                    contents => {
                        // Set http response header entry
                        myresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                        // Return 200 OK http status code
                        myresponse.writeHead(200);
                        // Send back file contents + close response
                         myresponse.end( contents ); 
                    }
                );
                                       
            } else { // Send back .json data file if anything other than root page comes in
                 fs.readFile(__dirname + "/data.json").then(
                    contents => {
                        // Set http response header entry
                        myresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                        // Return 200 OK http status code
                        myresponse.writeHead(200);
                        // Send back file contents + close response
                         myresponse.end( contents );
                    } 
                 );
            }
    };           
           
// Use http package createServer() that runs a web server
let myserver = myhttp.createServer(
    // createServer() uses our function to run when a request comes in
    requestListener
);

// Ask http to start listening on a tcp port for incoming http requests
// listen() takes 2 args: 1: tcp port #, 2: string of the ip address to listen (127.0.0.1 is local host)
// http://127.0.0.1:8080/  is what the server is running
myserver.listen(8080, "127.0.0.1");
console.log("Server has started");