// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendArray = require("../data/friendsData");
var fs = require('fs');
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friendsData", function(req, res) {
    res.json(friendArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

//   THIS IS WHERE THE FRIEND COMPATIBILITY WILL BE HANDLED
  app.post("/api/friendsData", function(req, res) {
    // Note the code here. Our "server" will respond to request from the post from the survey
    //form and then whatever I tell the server to respond with is what will be send back as the 
    //"data" response for the callback function
    //and let users know what the total difference.
    // It will do this by sending out res.json("bestMatchObject")
    // req.body is available since we're using the body-parser middleware
    //req.body is what we get when a post or (someone is passing a body of data to the server
    //and the body parser middle-ware is literally in the middle to take that data
    // and convert it into something nice for my server to deal with.)
    var userData = req.body;
    
    var bestMatch = {
        name:"",
        photo:"",
        score:50
    };

    

    for(var i=0; i< friendArray.length; i++){
        var totalDiff = 0;
        console.log(friendArray[i]);
        for(var j=0; j<friendArray[i].scores.length; j++){
            
           totalDiff += (Math.abs(parseInt(friendArray[i].scores[j]) - parseInt(userData.scores[j])));
        }
        if(totalDiff < bestMatch.score){
            bestMatch.score= totalDiff;
            bestMatch.name=friendArray[i].name;
            bestMatch.photo=friendArray[i].photo;
            console.log("the match score is:" + bestMatch.score);
        }   
        
    }
    console.log("The BEST MATCH IS: "+ bestMatch.score,bestMatch.name);
    ////////This is the response that goes back when ever this route is pinged/////////////////
                res.json(bestMatch);
    //////////////////////////////////////////////////////////////////////
    if (friendArray) {
        friendArray.push(userData);
        console.log("the new friend array is :"+ JSON.stringify(friendArray,null,2));
    }
    else {
      console.log("Sorry everyone found someone and you are left out!");
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     friendData = [];

//     console.log(tableData);
//   });
};
