/*
	FUNCIÓN: Controla los métodos o funciones necesarias para almacenar u obtener datos en cookies
	AUTOR: IVAN VALERA
*/

var cookies =
{
	setInfoCookies: function()
	{
		var json3Raya = JSON.stringify(config.partida);
		$.cookie("prueba4", json3Raya);
	},
	getInfoCookies: function()
	{
		if ($.cookie("prueba4") != undefined)
		{
			config.partida = new juego(true);
			config.partida.initJuego();	

			var auxPartida = JSON.parse($.cookie("prueba4"));
			var auxCasillas = auxPartida.tablero.casillas;

			for (var i = 0; i < auxCasillas.length; i++) 
			{
				for (var j = 0; j < auxCasillas.length; j++) 
				{
					if (auxCasillas[i][j].ficha != null)
					{
						var idCasilla = $("casilla_"+i+"_"+j).attr("id");
						if (parseInt(auxCasillas[i][j].ficha.type) === 1)
						{		
							config.partida.tablero.casillas[i][j].createFicha(1);
							examenFN_UI.drawFichas(idCasilla, 1);
						}
						else
						{		
							config.partida.tablero.casillas[i][j].createFicha(2);
							examenFN_UI.drawFichas(idCasilla, 2);
						}					
					}
				}
			};
		}
		else
		{
			config.partida = new juego(false);
			config.partida.initJuego();	
		}
	}
};