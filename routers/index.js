var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT photos.*, users.*, photos.id AS photoId FROM photos LEFT JOIN users ON photos.user_id = users.id ORDER BY photos.id DESC', function(err, photos){
      if(err){ return next(err); }
       	connection.query('SELECT * FROM comments', function(err, comments){
	      if(err){ return next(err); }
	      	 res.render('home/index', {comments: comments, photos: photos, req: req});
	      });
    });
  });

});

router.post('/:id/comment', function(req, res){
	var id = req.params.id;
	var comment = req.body.comment;

	var d = new Date();
	var yy = d.getFullYear();
	var mm = d.getMonth();
	var dd = d.getDay();
	var day = mm+'/'+dd+'/'+yy;

  	req.getConnection(function(err, connection){
  		if(err){ next(err); }

	    connection.query("INSERT INTO comments (photo_id, created_at , comment) VALUES (?)", [[id, day, comment]], function(){
	    	res.redirect(req.baseUrl);
	    });
    });
});


module.exports = router;

