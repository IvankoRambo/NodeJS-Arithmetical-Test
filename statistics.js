function Statistics(){};


Statistics.getStatistics = function(connection, id, from_data, to_data, callback){
	
	if(typeof from_data == 'undefined'){
		
		switch (id){
			case 'taken':
			connection.query('SELECT students.name, students.surname, student_cart.percent, student_cart.wrong_count, student_cart.right_count, student_cart.types, wrong_equestions.equestion, wrong_equestions.result, student_cart.date FROM student_cart INNER JOIN students ON student_cart.login = students.login INNER JOIN wrong_equestions ON wrong_equestions.id_cart = student_cart.id ORDER BY student_cart.date DESC', function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
			case 'outsiders':
			connection.query('SELECT students.name, students.surname FROM student_cart RIGHT JOIN students ON student_cart.login = students.login WHERE student_cart.percent IS NULL ORDER BY students.name', function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
			case 'losers':
			connection.query('SELECT students.name, students.surname FROM student_cart INNER JOIN students ON student_cart.login = students.login WHERE student_cart.percent <= 50 GROUP BY student_cart.login HAVING count(*) >= 3 ORDER BY students.name', function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
		}
		
	}
	else{
		
		
		switch (id){
			case 'taken':
			connection.query('SELECT students.name, students.surname, student_cart.percent, student_cart.wrong_count, student_cart.right_count, student_cart.types, wrong_equestions.equestion, wrong_equestions.result, student_cart.date FROM student_cart INNER JOIN students ON student_cart.login = students.login INNER JOIN wrong_equestions ON wrong_equestions.id_cart = student_cart.id WHERE student_cart.date BETWEEN :from_data AND :to_data ORDER BY student_cart.date DESC', {from_data: from_data, to_data: to_data}, function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
			case 'outsiders':
			connection.query('SELECT students.name, students.surname FROM students, student_cart WHERE students.login NOT IN (SELECT login FROM student_cart) AND student_cart.date BETWEEN :from_data AND :to_data GROUP BY students.name ORDER BY students.name', {from_data: from_data, to_data: to_data}, function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
			case 'losers':
			connection.query('SELECT students.name, students.surname FROM student_cart INNER JOIN students ON student_cart.login = students.login WHERE student_cart.percent <= 50 AND student_cart.date BETWEEN :from_data AND :to_data GROUP BY student_cart.login HAVING count(*) >= 3 ORDER BY students.name', {from_data: from_data, to_data: to_data}, function(err, result){
				
				if(err){
					callback(err);
				}
				else{
					callback(err, result);
				}
				
			});
			break;
		}
		
		
	}
	
}

module.exports = Statistics;
