/*
	FUNCIÓN: Controla los métodos o funciones necesarias derivadas de eventos que van a producirse en la web
	AUTOR: IVAN VALERA
*/

$(document).ready(function()
{
	cookies.getInfoCookies();

	$('.classCasilla').click(function()
	{
		var idCasilla = $(this).attr("id");
		var casilla = config.partida.tablero.getCasilla(idCasilla);

		if (casilla.ficha === null)
		{
			casilla.createFicha(config.turn);
			examenFN_UI.drawFichas(idCasilla, config.turn);

			if (config.turn === 1) config.turn = 2;
			else config.turn = 1;

			cookies.setInfoCookies();
		}
	});
});