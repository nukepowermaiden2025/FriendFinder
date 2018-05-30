// ===============================================================================
// LOAD DATA

var friendArray = require("../data/friendsData");
var fs = require('fs');
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friendsData", function(req, res) {
    res.json(friendArray);
  });

//   THIS IS WHERE THE FRIEND COMPATIBILITY WILL BE HANDLED
  app.post("/api/friendsData", function(req, res) {
    var userData = req.body;  
    var bestMatch = {
        name:"",
        photo:"",
        email:"",
        score:50
    };
    for(var i=0; i< friendArray.length; i++){
        var totalDiff = 0;
        for(var j=0; j<friendArray[i].scores.length; j++){
            
           totalDiff += (Math.abs(parseInt(friendArray[i].scores[j]) - parseInt(userData.scores[j])));
        }
        if(totalDiff < bestMatch.score){
            bestMatch.score= totalDiff;
            bestMatch.name=friendArray[i].name;
            bestMatch.email=friendArray[i].email;
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

 
};
