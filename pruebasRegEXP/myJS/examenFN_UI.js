/*
	FUNCIÓN: Controla los métodos o funciones necesarias para mostrar (dibujar) datos en pantalla
	AUTOR: IVAN VALERA
*/

var examenFN_UI = 
{
	changeInputColor: function(element, correct)
	{
		if (correct) element.css('background-color', 'lightgreen');
		else element.css('background-color', '#CC6666');
	},
	setInfoPersonas: function(auxPersona)
	{
		var info = 'Nombre Usuario: '+auxPersona.username + ' TEL: '+auxPersona.tel;
		info += ' PASS: ' + auxPersona.pass + ' DNI: '+auxPersona.dni + ' EMAIL: ' + auxPersona.email;
		info += ' FECHA_NAC: ' + auxPersona.f_nac;

		var code = '<div class="classInfoPersona">'+info+'</div>';

		$('#divInfoPersonas').append(code);
	}
};