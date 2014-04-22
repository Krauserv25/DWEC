//Script que controla los eventos producidos en el juego

//Evento que controla cuando se ha colocado el cursor sobre una ficha (los dos primeros juegos)
function mouseOverFicha (id)
{
	var auxCasillas = Juego.Tablero.casillas;
	var auxCoord = getIdFicha(id);
	var currentCasilla = auxCasillas[auxCoord.x][auxCoord.y];

	if (currentCasilla.ficha.estado === 2)
	{
		var auxCurrentId = "divCasilla_"+auxCoord.x+"_"+auxCoord.y;
		$("#"+auxCurrentId).css("background-color","green");
		currentCasilla.ficha.overFicha(auxCoord.x, auxCoord.y);
	}
}

//Evento que controla cuando se ha dejado de estar sobre una ficha (los dos primeros juegos)
function mouseLeaveFicha ()
{
	var auxCasillas = Juego.Tablero.casillas;

	for (var i = 0; i < auxCasillas.length; i++)
	{
		for (var j = 0; j < auxCasillas.length; j++)
		{
			cleanBackCasilla(i, j);
		}
	} 	
}

//Evento que controla el click sobre una casilla (OTELLO)
function clickInOtello (x, y)
{
	var i = 0;
	var found = false;
	var casillas = Juego.Tablero.casillas;

	while (i < arrayOtello.length && !found)
	{
		if (arrayOtello[i].pos_Final.x === x && arrayOtello[i].pos_Final.y === y) found = true;
		i++;
	}

	if (found)
	{
		var auxId = "divCasilla_"+x+"_"+y;
		var auxColor;

		if (player1_Turn) auxColor = 1;
		else auxColor = 2;

		fichasCont++;
		var fichaId = "ficha_"+fichasCont;
		casillas[x][y].ficha = new fichasFN(fichaId, auxColor, 1, Juego.normas.checkColindantesC, 
			Juego.normas.updateFichaC);	
		
		var code = "<img src='img/ficha"+auxColor+"_Normal.png' id="+fichaId+" class='classFicha"+auxColor+"_Normal' alt='ficha"+auxColor+"'>";
		$("#"+auxId).append(code);

		Juego.normas.updateFichaC();

		i = 0;
		while (i < arrayOtello.length)
		{
			var auxId = "divCasilla_"+arrayOtello[i].pos_Final.x+"_"+arrayOtello[i].pos_Final.y;
			$("#"+auxId).css("background-color","#FFFFE0");

			i++;
		}

		player1_Turn = !(player1_Turn);
		arrayOtello.length = 0;

		changeTurn();
	}
}

//Evento que controla cuando está situado el cursor sobre una casilla (OTELLO)
function overInOtello (x, y)
{
	var casillas = Juego.Tablero.casillas;
	var i = 0;
	var found = false;	

	while (i < arrayOtello.length && !found)
	{
		if (arrayOtello[i].pos_Final.x === x && arrayOtello[i].pos_Final.y === y) found = true;
		i++;
	}

	if (found)	
	{
		var auxId = "divCasilla_"+x+"_"+y;
		$("#"+auxId).css("background-color","#DA70D6");
	}
	else $("#"+auxId).css("background-color","#FFFFE0");
}

//Evento que viene por defecto en 3wSchools que sirve para permitir hacer drop una vez hecho el drag
function allowDrop(ev)
{
	ev.preventDefault();
}

//Evento que permite arrastrar una ficha del juego a ser posible (los dos primeros juegos)
function dragFicha(ev)
{
	var auxCoord = getIdFicha(ev.target.id);
	var currentCasilla = Juego.Tablero.casillas[auxCoord.x][auxCoord.y];
	currentFicha = currentCasilla.ficha;
	ev.dataTransfer.setData("Text",ev.target.id);
}

//Evento que permite dejar una ficha dentro de una casilla a ser posible (los dos primeros juegos)
function dropFicha(ev)
{
	var auxCoord = getIdFicha(currentFicha.id);
	var oldCasilla = Juego.Tablero.casillas[auxCoord.x][auxCoord.y];
	var oldCasillaId = "divCasilla_"+auxCoord.x+"_"+auxCoord.y;

	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");

	ev.target.appendChild(document.getElementById(data));

	auxCoord = getIndexCasilla(ev.target.id);
	var currentCasilla = Juego.Tablero.casillas[auxCoord.x][auxCoord.y];

	currentCasilla.ficha = currentFicha;
	oldCasilla.ficha = null;

	var currentCasillaId = "divCasilla_"+auxCoord.x+"_"+auxCoord.y;

	$("#"+currentCasillaId).attr("ondrop", "");
	$("#"+currentCasillaId).attr("ondragover", "");

	updateGame();
}