(function($){
	
	$('#login_form').on('submit', function(evt){
		
		evt.preventDefault();
		
		var data = {};
		data.login = $('#login').val();
		data.name = $('#name').val();
		data.surname = $('#surname').val();
		
		var request = $.ajax({
			url: '/login',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			beforeSend: function(){
				$('#login_message').empty();
			}
		})
		.done(function(response){
			if(response.result == true){
				window.location.href = '/';
			}
			else{
				$('#login_message').text(response.message);
			}
		});
		
	});
	
})(jQuery)
