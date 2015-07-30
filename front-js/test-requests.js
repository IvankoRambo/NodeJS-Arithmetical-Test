(function($){
	
	var check_count = 0;
	$('#score_div').hide();
	$('#equestion_div').hide();
	
	$("#checked_all").text('Check all');
	
	$("#checked_all").on('click', function(){
		
		check_count += 1;
		
		if(check_count % 2){
			$(":checkbox").prop("checked", true);
			$("#checked_all").text('Uncheck all');
		}
		else{
			$(":checkbox").prop("checked", false);
			$("#checked_all").text('Check all');
		}
		
		
	});
	
	$(document).ready(function(){
		$.get('/test/getname', function(response){
			
			$("h3 span").text(response.name);
			
		});
	});
	
	
	var Test = {
		
		init: function(){
			this.results_template = '<tr><td>Right:</td><td>{{right}}</td></tr><tr><td>Wrong:</td><td>{{wrong}}</td></tr><tr><td>Types of equestions:</td><td>{{types}}</td></tr><tr><td>Incorrectrly solved equestions:</td><td>{{incorrectly}}</td></tr><tr><td>Wrong answers:</td><td>{{wrong_answers}}</td></tr><tr><td>Percent of correct answers:</td><td>{{percent}}</td></tr>';
			this.total_count = 0;
			this.right_count = 0;
			this.wrong_count = 0;
			this.timer;
			this.wrong_equestions = [];
			this.wrong_answers = [];
			this.types = [];
			this.equestions;
			
			this.cache();
			this.bindEvent();
			
		},
		
		cache: function(){
			this.checkbox_form = $('#checkbox_form');
			this.submit_answer = $('#submit_answer');
			this.current_answer = $('#current_answer');
		},
		
		bindEvent: function(){
			this.checkbox_form.on('submit', this.setTest);
		},
		
		setTest: function(evt){
			
			evt.preventDefault();
			
			var self = Test,
			data = {};
			
			
			$(':checkbox').each(function(){
				var $this = $(this);
				var ischecked = $this.is(':checked');
				
				if(ischecked){
					self.types.push($this.val());
				}
				
			});
			
			data.checked = self.types;
			
			$.ajax({
				url: '/get/equestion',
				type: 'post',
				data: JSON.stringify(data),
				contentType: 'application/json',
				beforeSend: function(){
					$('#checkbox_err').empty();
				}
			})
			.done(function(response){
				
				var self = Test;
				
				if(!self.types.length){
					self.types = $(':checkbox').map(function(){
						return this.getAttribute('value');
					}).get();
				}
				
				self.equestions = response;
		
				if(!self.equestions.data.length){
					var err_message = 'No equestions of such type(s) have been set yet';
					$('#checkbox_err').text(err_message);
				}
				else{
					
					self.checkbox_form.unbind('submit');
					self.timer = setTimeout(self.timeOuted, 30000);
					
					$('#results_table tr').remove();
					$('#checkedbox_subdiv').hide();
					$('#score_div').show();
					$('#right_answer span').text(self.right_count);
					$('#wrong_answer span').text(self.wrong_count);
					$('#equestion_div').show();
					$('#test_div').show();
					$('#result_div').hide();
					$('#current').text(self.total_count);
					$('#total').text(self.equestions.data.length);
					$('#current_equestion').text(self.equestions.data[self.total_count].equestion);
					
					
					self.submit_answer.on('click', function(){
						
						clearTimeout(self.timer);
						
						if(self.current_answer.val() == self.equestions.data[self.total_count].result){
							self.right_count += 1;
							$('#right_answer span').text(self.right_count);
						}
						else{
							self.wrong_count += 1;
							$('#wrong_answer span').text(self.wrong_count);
							self.wrong_equestions.push(self.equestions.data[self.total_count].equestion);
							self.wrong_answers.push(self.current_answer.val());
						}
						
						self.total_count += 1;
						
						$('#current').text(self.total_count);
						
						self.current_answer.val('');
						
						if(self.total_count != self.equestions.data.length){
							$('#current_equestion').text(self.equestions.data[self.total_count].equestion);
							self.timer = setTimeout(self.timeOuted, 30000);
						}
						else{
							
							$('#test_div').hide();
							self.parseResults();
							$('#result_div').show();
							$('#checkedbox_subdiv').show();
							$('#checkedbox_subdiv form').children().not('#get_equestions').hide();
							$("#checked_all").hide();
							var message = 'You have finished the test. You can pass again.';
							$('#checkbox_err').text(message);
							$('#get_equestions').text('Pass again');
							
							var data = {};
							data.right = self.right_count;
							data.wrong = self.wrong_count;
							data.types = self.types.join();
							data.incorrect = self.wrong_equestions.join();
							data.wrong_answers = self.wrong_answers.join();
							data.percent = (self.right_count/self.equestions.data.length) * 100;
							
							$.ajax({
								url: '/record/result',
								type: 'post',
								data: JSON.stringify(data),
								contentType: 'application/json'
							})
							.done(function(response){
								console.log(response);
							});
						}
									
					});
					
				}
				
			});
			
		},
		
		timeOuted: function(){
			
			$('#score_div').hide();
			$('#equestion_div').hide();
			$('#checkedbox_subdiv').show();
			$('#checkedbox_subdiv form').children().not('#get_equestions').hide();
			$("#checked_all").hide();
			var message = 'Your test was interrupted owing to too long time you took for equestion.';
			$('#checkbox_err').text(message);
			$('#get_equestions').text('Pass again');
			
		},
		
		parseResults: function(){
			
			var self = Test;
			
			var content = 
			self.results_template.replace(/{{right}}/ig, self.right_count)
			.replace(/{{wrong}}/ig, self.wrong_count)
			.replace(/{{types}}/ig, self.types.join())
			.replace(/{{incorrectly}}/ig, self.wrong_equestions.join())
			.replace(/{{wrong_answers}}/ig, self.wrong_answers.join())
			.replace(/{{percent}}/ig, (self.right_count/self.equestions.data.length) * 100);
			
			$('#results_table').html(content);
			
		}
		
	};
	
	Test.init();
	
	
})(jQuery)
