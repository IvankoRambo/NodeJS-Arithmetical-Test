(function($){
	
	$('#block_message').hide();
	
	$('#current_answer').on('keydown', function(evt){
		
		var keyCode = ('which' in evt) ? evt.which : evt.keyCode;
		var $this = $(this),
		filter;
		
		filter = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode == 8);
		
		if(!filter || ( ( $this.val().length == 2 && parseInt($this.val()) == 10 && keyCode != 48 && keyCode != 8 ) || ( parseInt($this.val()) > 10 && keyCode != 8 ) ) ){
			$('#block_message').show();
			evt.preventDefault();
		}
		else{
			$('#block_message').hide();
		}
		
	});
	
})(jQuery)