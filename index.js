
var express = require("express");
var app = express();
var path = require("path");

// app.use('/static', express.static(path.join(__dirname, 'public')))



// app.listen(3000);
// console.log("Server running at Port 3000");

// var express = require("express");
// var app = express();
// var path = require("path");

//app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
// app.use('/imgs', express.static(__dirname + '/imgs'));
// app.use('/style', express.static(__dirname + '/style'));
// app.use('/shapes', express.static(__dirname + '/shapes'));
// app.use('/googleSheets', express.static(__dirname + '/googleSheets'));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
	// app.use("/public", express.static(__dirname + "/public"));
	app.use('/gameLogic', express.static(__dirname + '/gameLogic'));
	app.use('/googleSheets', express.static(__dirname + '/googleSheets'));
	app.use('/shapes', express.static(__dirname + '/shapes'));


	app.use('/imgs', express.static(__dirname + '/imgs'));
	app.use('/style', express.static(__dirname + '/style'));
	// app.use('/shapes', express.static(__dirname + '/shapes'));
	// app.use('/googleSheets', express.static(__dirname + '/googleSheets'));
	// app.use('/gameLogic', express.static(__dirname + '/gameLogic'));
	// 	app.use('/', express.static(__dirname + '/'));


  //__dirname : It will resolve to your project folder.
});


var server = app.listen(3000);
console.log("Server running at Port 3000");
