/*
	FUNCIÓN: Controla los métodos o funciones necesarias para mostrar (dibujar) datos en pantalla
	AUTOR: IVAN VALERA
*/

var examenFN_UI = 
{
	drawCasillas: function(id)
	{
		var code = '<div id='+id+' class="classCasilla"></div>';
		$('#divTablero').append(code);
	},
	drawFichas: function(idCasilla, type)
	{
		var color;
		if (type === 1) color = "red"
			else color = "purple";

		var code = '<div class="classFicha '+color+'"></div>';

		$('#'+idCasilla).append(code);
	}
};