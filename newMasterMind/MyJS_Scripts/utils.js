/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS ÚTILES ASÍ COMO CÁLCULOS O PROCESOS SECUNDARIOS
	AUTOR: IVAN VALERA
*/

var utils = 
{
	//Métodos que sirven para debugar y facilitar el seguimiento del proceso al programador
	alert: function(show)
	{
		//Paso 1: Mostrar los datos para debugar
		if (config.debug)
		{
			alert(show);
		}
	},
	log: function(show)
	{
		//Paso 1: Mostrar los datos para debugar
		if (config.debug)
		{
			console.log(show);
		}		
	},
	//Métodos que permiten almacenar o recuperar datos de una cookie
	saveIntentsCookies: function()
	{
		//Paso 1: Almacenar cookie
		$.cookie("maxIntents", $('#labelResultSlider').text());
	},
	getIntentsCookies: function()
	{
		//Paso 1: Comprobar que la cookie se haya creado
		//Paso 2: En caso afirmativo ajustar los datos del Slider con el valor de la cookie
		if ($.cookie("maxIntents") != undefined)
		{
			$( "#divSlider" ).slider( "value", $.cookie("maxIntents"));
			$('#labelResultSlider').text($.cookie("maxIntents"));
		}
	}
};