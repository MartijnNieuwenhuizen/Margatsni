var express = require('express');
var router = express.Router();
var fs = require('fs');

//var filesPath = __dirname + "/../files/";
var filesPath = './public/images/';

router.get('/', function(req, res){

	fs.readdir(filesPath, function(err, files){
    	res.locals.files = files;
    	res.render('./upload/upload', {req: req});
  	});
});

router.post("/", function(req, res){
  var userId = req.session.userId;
  var upload = req.files.upload;
  var caption = req.body.caption;
  var filename = upload.originalname;

  fs.rename(upload.path, filesPath + upload.originalname, function(err){
    if(err){
      res.send("Something went wrong!");
    } else {

      req.getConnection(function(err, connection){
      	if(err){ next(err); }

	    connection.query("INSERT INTO photos (user_id, caption, filename) VALUES (?)", [[userId, caption, filename]], function(){
	    	res.redirect(req.baseUrl + "/");
	    	console.log(userId + caption + filename);
	    });
	  });
    }
  }); 

});

// router.get("/", function(req, res, err) {
//   if(err){ return next(err); }

//   res
// })

module.exports = router;