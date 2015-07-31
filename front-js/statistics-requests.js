(function($){
	
	var Statistics = {
		
		init: function(){		
			
			self.info;
			
			this.cache();
			this.setQuery();
			
		},
		
		cache: function(){
			
			this.select_query_div = $('#select_query_div');
			this.query = $('#query');
			this.date_div = $('#date_div');
			this.result_table = $('#query_result_table');
		},
		
		setQuery: function(){
			
			var self = Statistics;
			
			this.query.on('change', function(){
								
				var input_values = [];
				
				$('#date_div input').each(function(index, element){
					
					if(element.value){
						input_values.push(element.value);
					}
					
				});
				
				
				if($('select option:selected').attr('id')){
				
				var data = {};
				
				if(input_values.length){
					
					if(!$('#date_div #from_year').val()){
						$('#query_message').text('You have to type the year of beginning necesarilly');
					}
					else{
						
							
							var from_year = $('#date_div #from_year').val();
							var from_month = $('#date_div #from_month').val() || '01';
							var from_day = $('#date_div #from_day').val() || '01';
							var to_year = $('#date_div #to_year').val() || $('#date_div #from_year').val();
							var to_month = $('#date_div #to_month').val() || '12';
							var to_day = $('#date_div #from_month').val() || '31';
							
							var from_data = from_year+'-'+from_month+'-'+from_day;
							var to_data = to_year+'-'+to_month+'-'+to_day;
							data.from_data = from_data;
							data.to_data = to_data;

					}
					
				}
				
				data.id = $('select option:selected').attr('id');
							
							
				$.ajax({
					url: '/get/statistics',
					type: 'post',
					data: JSON.stringify(data),
					contentType: 'application/json',
					beforeSend: function(){
						$('#query_message').empty();
						self.result_table.html('');
						}
					})
					.done(function(response){
						
						self.info = response;
						self.parseInfo();
						
				});
				
				
			}	
				
			});
			
		},
		
		parseInfo: function(){
			
			var self = Statistics;
			
			var thead_content = '',
			tr = '';
			
			for(var i = 0; i<self.info.data.length; i++){
				
				tr += '<tr>';
				
				for(var j in self.info.data[i]){
					
					if(i == 0){
						thead_content += '<th>'+j+'</th>';
					}
					
					tr += '<td>'+self.info.data[i][j]+'</td>';
					
				}
				
				tr += '</tr>';
				
			}
			
			self.result_table.html('<thead><tr>'+thead_content+'</tr></thead>'+'<tbody>'+tr+'</tbody>');
			
		}
		
	};
	
	Statistics.init();
	
})(jQuery)
