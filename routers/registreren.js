var express = require('express');
var router = express.Router();
 
 router.get('/', function(req, res) {
 	res.render('user_registreren/registreren', {req: req, error : null});
 });

router.post('/', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

	req.getConnection(function(err, connection) {
		if(err){
			next(err);
		}

		connection.query('SELECT * FROM users', function(err, records){
    		if(err){ return next(err); }
 			if(email == ""){
 				var data = {
 				    req: req,
 				    error: "Please add register"
 				}
 				res.render('user_registreren/registreren', data);
 			}else {
				connection.query('INSERT INTO users (email, password, name) VALUES (?)', [[email, password, name]]);
				res.redirect('/index');
			}
    	});
	});
});

module.exports = router;
