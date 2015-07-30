(function($){
	
	$('#add_equestion_form').on('submit', function(evt){
		
		evt.preventDefault();
		var self = $(this);
		
		var data = {};
		data.admin_equestion = $('#admin_equestion').val();
		
		var request = $.ajax({
			url: '/add/equestion',
			type: 'post',
			data: JSON.stringify(data),
			contentType: 'application/json',
			beforeSend: function(){
				$('#admin_message').empty();
			}
		})
		.done(function(response){
			$('#admin_equestion').val('');
			$('#admin_message').html('<span>'+ response.message +'<span>');
		});
		
	});
	
})(jQuery)
