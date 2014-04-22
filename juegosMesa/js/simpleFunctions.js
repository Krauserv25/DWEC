//Este Script contiene las funciones que "mueven" el juego y su estructura y que no están directamente ligadas a las clases

//Función que se llamará al generarse el cuerpo del HTML (body) e instancia un objeto de la clase juego para empezar
function init()
{
	Juego = new juegoFN(1);
	Juego.createTablero(8);
}

//Función que cambia el turno de jugador en el juego del Otello
function changeTurn ()
{
	calculateOtelloPoints();

	var casillas = Juego.Tablero.casillas;

	for (var i = 0; i < casillas.length; i++)
	{
		for (var j = 0; j < casillas.length; j++)
		{
			if (casillas[i][j].ficha != null)
			{
				Juego.normas.checkColindantesC(i, j, -1, -1);				
			}
		}
	}	
}

//Función que calcula los puntos de cada jugador en el Otello
function calculateOtelloPoints ()
{
	var casillas = Juego.Tablero.casillas;
	var auxTotalRojo = 0;
	var auxTotalAzul = 0;

	for (var i = 0; i < casillas.length; i++)
	{
		for (var j = 0; j < casillas.length; j++)
		{
			if (casillas[i][j].ficha != null)
			{
				if (casillas[i][j].ficha.color === 1) auxTotalRojo++;
				else auxTotalAzul++;
			}
		}
	}	

	totalFichasOtello.rojo = auxTotalRojo;
	totalFichasOtello.azul = auxTotalAzul;

	var auxColor;
	if (player1_Turn) auxColor = 1;
	else auxColor = 2;

	$("#imageTurn").attr('class', 'classImageTurn'+auxColor);
	$("#spanTotalRojo").html(totalFichasOtello.rojo);
	$("#spanTotalAzul").html(totalFichasOtello.azul);
}

//Función que obtiene la x e y de un objeto casilla a partir de su id en html
function getIndexCasilla (idCasilla)
{
	var i = 0;
	var j = 0;
	var auxCoord = 
	{
		x: -1,
		y: -1
	};
	var foundCasilla = false;
	var auxCasillas = Juego.Tablero.casillas;
	var index;

	var splitArray = idCasilla.split("_");
	var x = parseInt(splitArray[1]);
	var y = parseInt(splitArray[2]);

	while (i < auxCasillas.length && !foundCasilla)
	{
		while (j < auxCasillas.length && !foundCasilla)
		{
			if (auxCasillas[i][j].x === x && auxCasillas[i][j].y === y)
			{
				foundCasilla = true;
				auxCoord.x = i;
				auxCoord.y = j;			
			}

			j++;
		}
		
		i++; j = 0;
	}

	return auxCoord;	
} 

//Función que busca la x e y de un objeto casilla a partir de la id de una ficha en html, la cual, está asignada a una casilla
function getIdFicha (id)
{
	var found = false;
	var auxCasillas = Juego.Tablero.casillas;
	var i = 0;
	var j = 0;
	var auxCoord = 
	{
		x: -1,
		y: -1
	};

	while (i < auxCasillas.length && !found)
	{
		while (j < auxCasillas.length && !found)
		{
			if (auxCasillas[i][j].ficha != null && auxCasillas[i][j].ficha.id === id)
			{
				found = true;
				auxCoord.x = i;
				auxCoord.y = j;
			}

			j++;
		}

		i++; j = 0;
	}

	return auxCoord;
}

//Función que limpia o reestablece el color natural de una casilla que ha sido señalada en color para orientar al usuario
function cleanBackCasilla (x, y)
{
	var auxId = "divCasilla_"+x+"_"+y;
	$("#"+auxId).css("background-color","#FFFFE0");	
}

//Función que actualiza los datos de los dos primeros juegos recorriendo todas las fichas y modificandolas según su felicidad
var updateGame = function ()
{
	var auxCasillas = Juego.Tablero.casillas;

	for (var i = 0; i < auxCasillas.length; i++)
	{
		for (var j = 0; j < auxCasillas.length; j++)
		{
			if (auxCasillas[i][j].ficha != null)
			{
				var auxColindantes = auxCasillas[i][j].ficha.checkColindantes(i, j, -1, -1);

				if (auxColindantes) 
				{
					auxCasillas[i][j].ficha.estado = 1;
				}
				else auxCasillas[i][j].ficha.estado = 2;

				auxCasillas[i][j].ficha.updateFicha();
			}
		}
	}	
}