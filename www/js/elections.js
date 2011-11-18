
function getPartiesStats(q,i){

	if(i<3){
		$.ajax({
			method:'get',
		    url: 'http://vizzuality.cartodb.com/api/v1/sql/?q='+ escape(q[i]),
		    dataType: 'jsonp',
		    success: function(result) {
		    	$('.n'+i+' span.big').text(result.rows[0].count);
		    	getPartiesStats(q,i+1);
		    }
		});
	}
}


$(document).ready(function() {

	var queries = ["SELECT count(*) FROM elecciones2008 WHERE (upo_nombre_partido='PP')",
  	"SELECT count(*) FROM elecciones2008 WHERE (upo_nombre_partido='PSOE')",
	"SELECT count(*) FROM elecciones2008 WHERE (upo_nombre_partido!='PP' and upo_nombre_partido!='PSOE')"];

  	getPartiesStats(queries,0);

});