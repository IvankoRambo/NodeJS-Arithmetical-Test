function Equestions(){};


Equestions.add = function(arg1, arg2){
	return parseInt(arg1) + parseInt(arg2);
}

Equestions.deduct = function(arg1, arg2){
	return parseInt(arg1) - parseInt(arg2);
}

Equestions.multiply = function(arg1, arg2){
	return parseInt(arg1) * parseInt(arg2);
}

Equestions.divide = function(arg1, arg2){
	return parseInt(arg1) / parseInt(arg2);
}


Equestions.setEquestionInfo = function(connection, equestion, callback){
	
	var message,
	equestion_type,
	equestion_result,
	equestion_separator,
	equestion_array;
	
	equestion_separator = equestion.match(/\D/)[0];
	equestion_array = equestion.split(/\D/);
	
	
	connection.query("SELECT * FROM equestion_types where sign=:sign", {sign: equestion_separator}, function(err, result, columns){
		
		
		if(err){
			callback(err);
		}
		else{
			callback(null, result[0].type, equestion_separator, equestion_array, equestion);
		}
		
	});
	
}


Equestions.addEquestion = function(connection, result, equestion, type, callback){
	
	
	connection.query('INSERT INTO equestions (equestion, result, type) VALUE (:equestion, :result, :type)', {equestion: equestion, result: result, type: type}, function(err, result, columns){
		
		if(err){
			callback(err);
		}
		else{
			callback(null);
		}
		
	});
	
}

Equestions.getTypes = function(connection, callback){
	
	connection.query('SELECT type FROM equestion_types', function(err, result){
		
		if(err){
			callback(err);
		}
		else{
			callback(null, result);
		}
		
	});
		
}


Equestions.getFilteredEquestions = function(connection, equestion_type, callback){
	
	if(typeof equestion_type == 'undefined'){
		
		connection.query('SELECT equestion, result, type FROM equestions ORDER BY rand()', function(err, result){
			
			if(err){
				callback(err);
			}
			else{
				callback(null, result);
			}
			
		});
		
	}
	else{
		
		equestion_type = equestion_type.join(',');
		
		
		connection.query('SELECT equestion, result, type FROM equestions WHERE type IN (:equestion_type) ORDER BY rand()', {equestion_type: equestion_type}, function(err, result){
			
			if(err){
				callback(err);
			}
			else{
				callback(null, result);
			}
			
		});
		
	}
	
}

module.exports = Equestions;
