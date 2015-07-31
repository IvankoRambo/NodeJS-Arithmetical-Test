
function studentCart(){};


studentCart.addCart = function(connection, login, total_count, wrong_count, right_count, types, date, wrong_equestions, wrong_answers, callback){
	
	connection.query('INSERT INTO student_cart (login, percent, wrong_count, right_count, types, date) VALUE (:login ,:percent, :wrong_count, :right_count, :types, :date)', {login: login, percent: (right_count/total_count)*100, wrong_count: wrong_count, right_count: right_count, types: types, date: date}, function(err, result){
		
		if(err){
			callback(err);
		}
		else{
			callback(null, wrong_equestions, wrong_answers);
		}
		
	});
	
}

studentCart.addWrongCart = function(connection, wrong_equestions, wrong_answers, callback){
	
	connection.query('INSERT INTO wrong_equestions (id_cart, equestion, result) VALUE ((SELECT MAX(id) FROM student_cart), :wrong_equestions, :wrong_answers)', {wrong_equestions: wrong_equestions, wrong_answers: wrong_answers}, function(err, result){
		
		if(err){
			callback(err);
		}
		else{
			callback(null);
		}
		
	});
		
}

module.exports = studentCart;
