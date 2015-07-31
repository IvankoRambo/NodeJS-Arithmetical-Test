function Student(){};

Student.addStudent = function(connection, login, name, surname, callback){
	
	connection.query('INSERT INTO students (login, name, surname) VALUE (:login, :name, :surname)', {login: login, name: name, surname: surname}, function(err, result, columns){
		
		if(err){
			callback(err);
		}
		else{
			callback();
		}
		
	});
	
}


module.exports = Student;