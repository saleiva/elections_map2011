
var year = 2008;
var cartodb_layer;

function getPartiesStats(q,i){

	if(i==0){
		var qs = q;
		qs.pop();
	}else{
		var qs = q;
	}

	if(i<3){
		$.ajax({
			method:'get',
		    url: 'http://vizzuality.cartodb.com/api/v1/sql/?q='+ escape(qs[i]),
		    dataType: 'jsonp',
		    success: function(result) {
		    	$('.n'+i+' span.big').text(result.rows[0].count);
		    	getPartiesStats(qs,i+1);
		    }
		});
	}
}

function generateQueries(y){
	return ["SELECT count(*) FROM elecciones"+y+" WHERE (upo_nombre_partido='PP')",
  	"SELECT count(*) FROM elecciones"+y+" WHERE (upo_nombre_partido='PSOE')",
	"SELECT count(*) FROM elecciones"+y+" WHERE (upo_nombre_partido!='PP' and upo_nombre_partido!='PSOE')",
	"SELECT esp_adm.the_geom, esp_adm.the_geom_webmercator, elecciones"+ y +".upo_codigo_color FROM elecciones"+y+" INNER JOIN esp_adm ON (elecciones"+y+".upo_nombre = esp_adm.name_2)"];
}

function selectButton(){
	$('.overlay.right ul li a').removeClass('selected');
	$(this).addClass('selected');
	year = $(this).text();
	cartodb_layer.update(generateQueries(year).pop());
	getPartiesStats(generateQueries(year),0);
}


$(document).ready(function() {
	$('.overlay.right ul li a').click('click', selectButton);
  	getPartiesStats(generateQueries(year),0);

});