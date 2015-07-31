var express = require('express');
var app = express();
var mysql = require('mysql');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');
var eq = require('./equestions');
var session = require('express-session');
var students = require('./students');
var studentCart = require('./student-cart');
var statistics = require('./statistics');


app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'tester', name: 'tester', proxy: true, resave: true, saveUninitialized: true}));
app.use('/front-js', serveStatic(path.join(__dirname, 'front-js')));
app.use('/css', serveStatic(path.join(__dirname, 'css')));


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'kolaider',
	database: 'calculation'
});


connection.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};



connection.connect(function(err){
	if(err) throw err;
	console.log('Connection: OK');
});


app.engine('html', require('ejs').renderFile);

app.use(session({secret: 'testtakers', name: 'testaker', proxy: true, resave: true, saveUninitialized: true}));
app.use('/front-js', serveStatic(path.join(__dirname, 'front-js')));
app.use('/css', serveStatic(path.join(__dirname, 'css')));


var sess;

app.get('/', function(req, res){
	sess = req.session;
	
	if(!sess.login){
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
	
	
	sess.login = req.body.login;
	
	students.addStudent(connection, sess.login, req.body.name, req.body.surname, function(err){
		
		if(err){
			res.json({result: false, message: 'Type another login. It has to be unique.'});
		}
		else{
			res.json({result: true, message: 'loggedin'});
		}
		
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
	
	if(!sess.login){
		return res.status(404).json({result: false, message: "Not found the user"});
	}
	
	eq.getTypes(connection, function(err, types){
		
		if(err){
			throw err;
		}
		else{
			
			res.json({
				result: true,
				name: sess.login,
				types: types
			});
			
		}

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

		if(!sess.login){
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
	

	if(!req.body.admin_equestion.match(/^\d+\D{1}\d+$/)){
		message = 'The format of equestion has to be like (digits[arithmetical sign]digits)';
		return res.json({result: false, message: message});
	}
	
	eq.setEquestionInfo(connection, req.body.admin_equestion, function(err, type, equestion_separator, equestion_array, equestion){
		
		
		if(err){
			throw err;
		}
		else{
		
			switch(equestion_separator){
				case '+':
				equestion_result = eq.add(equestion_array[0], equestion_array[1]);
				break;
				case '-':
				equestion_result = eq.deduct(equestion_array[0], equestion_array[1])
				break;
				case '*':
				equestion_result = eq.multiply(equestion_array[0], equestion_array[1]);
				break;
				case '/':
				equestion_result = eq.divide(equestion_array[0], equestion_array[1]);
				break;
				default:
				message = 'The action between digits was appointed incorrectly';
				return res.json({result: false, message: message});
			}
			
			if(!(equestion_result >= 0 && equestion_result <= 100) || equestion_result.toString().indexOf('.') !== -1){
				message = 'Result has to be a natural number between 0 and 100';
				return res.json({result: false, message: message});
			}
			
			eq.addEquestion(connection, equestion_result, req.body.admin_equestion, type, function(err){
				
				if(err){
					throw err;
				}
				else{
					message = 'You have added new equestion successfully';
					
					res.json({
						result: true,
						message: message
					});
					
				}
				
			});
		
		}
		
	});
	
});


app.post('/get/equestion', bodyParser.json(), function(req, res){
	

	(req.body.checked.length) ? eq.getFilteredEquestions(connection, req.body.checked, function(err, types){
		
		if(err){
			throw err;
		}
		else{
			
			res.json({
				result: true,
				data: types
			});
			
		}
		
	}) : eq.getFilteredEquestions(connection, undefined, function(err, types){
		
		if(err){
			throw err;
		}
		else{
			
			res.json({
				result: true,
				data: types
			});
			
		}
		
	});
		
});

app.post('/record/result', bodyParser.json(), function(req, res){
	
	sess = req.session;
	
	if(!sess.login){
		return res.status(400).json({result: false, message: "Bad request. Session has been expired"});
	}
	
	studentCart.addCart(connection, sess.login, req.body.total, req.body.wrong, req.body.right, req.body.types, null, req.body.incorrect, req.body.wrong_answers, function(err, wrong_equestions, wrong_answers){
		
		if(err){
			throw err;
		}
		else{
			studentCart.addWrongCart(connection, wrong_equestions, wrong_answers, function(err){
				
				if(err){
					throw err;
				}
				else{
					
					res.json({
						result: true
					});
					
				}
				
			});
		}
		
	});
	
	
});


app.post('/get/statistics', bodyParser.json(), function(req, res){
	
	statistics.getStatistics(connection, req.body.id, req.body.from_data, req.body.to_data, function(err, result){
		
		if(err){
			throw err;
		}
		else{
			
			res.json({
				result: true,
				data: result
			});
			
		}
		
	});
	
	
});


var serverListen = app.listen(3000, function(){
	console.log('Additive information. Port: '+ serverListen.address().port);
});

