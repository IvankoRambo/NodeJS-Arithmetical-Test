var cart = [];

function studentCart(){};

studentCart.addTest = function(uid ,wrong, right, types, incorrect, wrong_answers, percent, date){
	cart.push({
		wrong: wrong,
		right: right,
		types: types,
		incorrect_equestions: incorrect,
		wrong_answers: wrong_answers,
		right_percent: percent, 
		date: date
	});
}

studentCart.getTest = function(){
	return cart;
}

module.exports = studentCart;
