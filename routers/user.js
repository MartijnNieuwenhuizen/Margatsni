var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  
  if(req.session.userId){
    req.getConnection(function(err, connection){
      if(err){ return next(err); }

      connection.query("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
        if(err){ return next(err); }

        console.log(records);
        var name = req.session.name;
        res.render('./user', {name: name, req: req});
      });
      
    });
  } else {
    res.redirect('/user/login');
  }
});


router.get('/:id/:name', function(req, res, next){
  var id = req.params.id; 
  var name = req.params.name; 

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT photos.*, users.*, photos.id AS photoId FROM photos LEFT JOIN users ON photos.user_id = users.id WHERE user_id = ?',[id], function(err, photos){
      if(err){ return next(err); }

        connection.query('SELECT * FROM comments', function(err, comments){
        if(err){ return next(err); }
           res.render('./user/profile', {
            req: req,
            id: id,
            name : name,
            comments: comments, 
            photos: photos
            });
        });
    });
  });

  
});

router.get('/login', function(req, res){
	  res.render('./user/login', {
		  req: req,
    	error: null,
  	});
});

router.get('/logout', function(req, res){
  req.session.destroy(function() {
    res.redirect(req.baseUrl + "/");
  });
});

router.post('/login', function(req, res, next){
  var username = req.body.email;
  var password = req.body.password;
  
  req.getConnection(function(err, connection){
    if(err){ next(err); }

    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], function(err, records){
      if(err){ next(err); }

      if(records.length > 0){
        req.session.userId = records[0].id;
        req.session.name = records[0].name;
        console.log("Logged in! HOORAY", records[0]);
        res.redirect('/index');
      } else {
        var data = {
          req: req,
          error: "Username or password is not matching!"
        }
        res.render("user/login", data);
      }
    });

  });

});

module.exports = router;