// ==============================================================================
// DEPENDENCIES


var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// ==============================================================================
// EXPRESS CONFIGURATION

var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ================================================================================
// ROUTER
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require("./app/routes/apiRoutes")(app);//API Routes 
require("./app/routes/htmlRoutes")(app);//Html Routes 

// =============================================================================
// LISTENER



app.listen(PORT, ()=> {
  console.log("App listening on PORT: " + PORT);
});
