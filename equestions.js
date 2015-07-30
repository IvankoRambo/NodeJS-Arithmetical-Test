var equestions = [];


function add(arg1, arg2){
	return parseInt(arg1) + parseInt(arg2);
}

function deduct(arg1, arg2){
	return parseInt(arg1) - parseInt(arg2);
}

function multiply(arg1, arg2){
	return parseInt(arg1) * parseInt(arg2);
}

function divide(arg1, arg2){
	return parseInt(arg1) / parseInt(arg2);
}


function addEquestion(equestion){
	
	var message,
	equestion_type,
	equestion_result,
	equestion_separator,
	equestion_array;
	
	if(!equestion.match(/^\d+\D{1}\d+$/)){
		message = 'The format of equestion has to be like (digits[arithmetical sign]digits)';
		return message;
	}
	
	equestion_separator = equestion.match(/\D/)[0];
	equestion_array = equestion.split(/\D/);
	
	switch(equestion_separator){
		case '+':
		equestion_result = add(equestion_array[0], equestion_array[1]);
		equestion_type = 'Sum';
		break;
		case '-':
		equestion_result = deduct(equestion_array[0], equestion_array[1])
		equestion_type = 'Difference';
		break;
		case '*':
		equestion_result = multiply(equestion_array[0], equestion_array[1]);
		equestion_type = 'Multiply';
		break;
		case '/':
		equestion_result = divide(equestion_array[0], equestion_array[1]);
		equestion_type = 'Divide';
		break;
		default:
		message = 'The action between digits was appointed incorrectly';
		return message;
	}
	
	if(!(equestion_result >= 0 && equestion_result <= 100) || equestion_result.toString().indexOf('.') !== -1){
		message = 'Result has to be a natural number between 0 and 100';
		return message;
	}
	
	equestions.push({
		equestion: equestion,
		result: equestion_result,
		type: equestion_type
	});
	
	message = 'You have added new equestion successfully';
	
	return message;
	
}


function getFilteredEquestions(equestion_type){
	
	var filtered_array = [];
	
	if(typeof equestion_type != 'undefined'){
		
		for(var i = 0; i<equestion_type.length; i++){
			
			filtered_array = filtered_array.concat(equestions.filter(function(obj){
				return obj.type == equestion_type[i];
			}));
			
		}	
	}
	else{
		filtered_array = equestions;
	}
	
	
	filtered_array = filtered_array.sort(function(a, b){
		return Math.floor(Math.random()*100) < a.result;
	});
		
	return filtered_array;
	
}


exports.addEquestion = addEquestion;
exports.getFilteredEquestions = getFilteredEquestions;
