/*
	FUNCIÓN: Controla los métodos o funciones necesarias para orientar y ayudar al programador
	AUTOR: IVAN VALERA
*/

var utils =
{
	alert: function(show)
	{
		if (config.debug)
		{
			alert(show);
		}
	},
	log: function(show)
	{
		if (config.debug)
		{
			console.log(show);
		}		
	}
};