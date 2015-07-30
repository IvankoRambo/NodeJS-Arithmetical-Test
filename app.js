var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');
var eq = require('./equestions');
var session = require('express-session');
var studentCart = require('./student-cart');

app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'testtakers', name: 'testaker', proxy: true, resave: true, saveUninitialized: true}));
app.use('/front-js', serveStatic(path.join(__dirname, 'front-js')));
app.use('/css', serveStatic(path.join(__dirname, 'css')));

var users = {};
var uid = function(){
	return Date.now().toString(16) + Math.floor(Math.random() * 1000).toString(16);
}

var sess;

app.get('/', function(req, res){
	sess = req.session;
	
	if(!sess.uid){
		res.render('index.html');
	}
	else{
		res.redirect('/test');
	}
	
});

app.post('/login', bodyParser.json(), function(req, res){
	
	sess = req.session;
	
	if (!(req.body.login || req.body.name || req.body.surname)) {
		return res.status(400).json({result: false, message: "Bad request. Fill all fields, when login"});
	}
	
	sess.uid = uid();
	
	var user = {
		id: sess.uid,
		login: req.body.login,
		name: req.body.name,
		surname: req.body.surname
	};
	
	users[user.id] = user;
	
	res.json({
		result: true, 
		message: "loggedin"
	});
	
});

app.get('/logout', function(req, res){
	
	req.session.destroy(function(err){
		
		if(err){
			throw err;
		}
		else{
			res.redirect('/');
		}
		
	});
	
});

app.get('/test/getname', function(req, res){
	
	sess = req.session;
	var user = users[sess.uid];
	
	if(!user){
		return res.status(404).json({result: false, message: "Not found the user"});
	}
	
	var username = user.name;
	res.json({
		result: true,
		name: username
	});
		
});



app.get('/:page*', function(req, res){
	
	var filename = req.params[0];
	sess = req.session;
	
	if( !filename ){
		filename = 'index.html';
	}
	else{
		filename = filename.replace(/^\//, '') + '.html';
	}
	
	if(req.params.page == 'test'){
		if(!sess.uid){
			res.redirect('/');
		}
	}
	
	res.sendFile(path.join(__dirname, req.params.page, filename));
	
});


app.post('/add/equestion', bodyParser.json(), function(req, res){
	
	//In case 'required' attr does not work in old browsers
	if(!req.body.admin_equestion){
		return res.status(400).json({result: false, message: "Bad request. You have to fill the field"});
	}
	
	var message = eq.addEquestion(req.body.admin_equestion);
	
	res.json({
		result: true,
		message: message
	});
	
});


app.post('/get/equestion', bodyParser.json(), function(req, res){
	
	var equestion_array = ( req.body.checked.length ) ? eq.getFilteredEquestions(req.body.checked) : eq.getFilteredEquestions(undefined);
	
	res.json({
		result: true,
		data: equestion_array
	});
		
});

app.post('/record/result', bodyParser.json(), function(req, res){
	
	sess = req.session;
	
	if(!sess.uid){
		return res.status(400).json({result: false, message: "Bad request. Session has been expired"});
	}
	else if(!users[sess.uid]){
		return res.status(404).json({result: false, message: "Not found. Cannot find current user in the system"});
	}
	
	studentCart.addTest(sess.uid, req.body.wrong, req.body.right, req.body.types, req.body.incorrect, req.body.wrong_answers, req.body.percent, (new Date()).toString().split(' ').splice(1,3).join(' '));
	
	res.json({
		result: true
	});
	
});


var serverListen = app.listen(8000, function(){
	console.log('Additive information. Port: '+ serverListen.address().port);
});

