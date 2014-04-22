//Script de selección de juego mediante HTML

var typeGame = 1;

//Función que modifica el aspecto o funcionalidad sobre la selección de juego según el juego elegido
function selectGameItem (n)
{
	$("#divSelectorJuego"+typeGame).attr('class', 'classSelectorGame');
	$("#spanIntroJuego"+typeGame).hide(true);
	$("#buttonPlay"+typeGame).hide(true);
	
	switch (n)
	{
		case 1:
		$("#divSelectorJuego1").attr('class', 'classCurrentSelectedGame');
		$("#buttonPlay1").show();
		$("#spanIntroJuego1").show();
		$("#divCabeceraExplicacion").html("<span>RACISTA 1</span>");
		typeGame = 1;
		break;

		case 2:
		$("#divSelectorJuego2").attr('class', 'classCurrentSelectedGame');
		$("#buttonPlay2").show();
		$("#spanIntroJuego2").show();
		$("#divCabeceraExplicacion").html("<span>RACISTA 2</span>");
		typeGame = 2;
		break;

		case 3:
		$("#divSelectorJuego3").attr('class', 'classCurrentSelectedGame');
		$("#buttonPlay3").show();
		$("#spanIntroJuego3").show();
		$("#divCabeceraExplicacion").html("<span>OTELLO</span>");
		typeGame = 3;
		break;
	}
}

//Función que inicia la partida del juego seleccionado una vez pulsado el botón correspondiente
function startGame(n)
{
	totalFichasOtello.rojo = 0;
	totalFichasOtello.azul = 0;
	$("#divTablero").empty();
	$("#divInfoGames").hide(true);

	switch (n)
	{
		case 1:
		Juego = new juegoFN(1);
		Juego.createTablero(8);
		break;

		case 2:
		Juego = new juegoFN(2);
		Juego.createTablero(8);
		break;

		case 3:
		$("#divInfoGames").show();
		Juego = new juegoFN(3);
		Juego.createTablero(8);
		break;
	}	
}