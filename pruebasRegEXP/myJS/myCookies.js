/*
	FUNCIÓN: Controla los métodos o funciones necesarias para almacenar u obtener datos en cookies
	AUTOR: IVAN VALERA
*/

var cookies =
{
	setInfoCookies: function()
	{
		var jsonPersonas = JSON.stringify(config.allPersonas);
		$.cookie("allPersonas", jsonPersonas);
	},
	getInfoCookies: function()
	{
		if ($.cookie("allPersonas") != undefined)
		{
			config.allPersonas = JSON.parse($.cookie("allPersonas"));

			for (var i = 0; i < config.allPersonas.length; i++)
			{
				examenFN_UI.setInfoPersonas(config.allPersonas[i]);
			}
		}
		else
			config.allPersonas = new Array();
	}
};