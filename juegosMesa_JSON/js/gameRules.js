//Script donde se encuentran las normas asociadas para cada juego
var isInLoad = false;
//Clase de normas que contiene todas las funciones necesarias para establecer el comportamiento de las fichas o
//en algun caso, las casillas
var normasFN = function ()
{
	//Función que devuelve true en caso de que la ficha sea feliz (condición para el primer juego)
	this.checkColindantesA = function(x, y, ignoredX, ignoredY)
	{
		var casillas = Juego.Tablero.casillas;
		var contColindantes = 0;

		if (checkPosFichas(x-1, y-1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x-1][y-1])) contColindantes++;
		if (checkPosFichas(x, y-1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x][y-1])) contColindantes++;
		if (checkPosFichas(x+1, y-1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x+1][y-1])) contColindantes++;
		if (checkPosFichas(x+1, y, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x+1][y])) contColindantes++;
		if (checkPosFichas(x+1, y+1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x+1][y+1])) contColindantes++;
		if (checkPosFichas(x, y+1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x][y+1])) contColindantes++;
		if (checkPosFichas(x-1, y+1, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x-1][y+1])) contColindantes++;
		if (checkPosFichas(x-1, y, ignoredX, ignoredY) && checkFichas(this.color, "mismo", casillas[x-1][y])) contColindantes++;

		if (contColindantes >= 3)
		{
			return true;
		}

		return false;
	};

	//Función que devuelve true en caso de que la ficha sea feliz (condición para el segundo juego)
	this.checkColindantesB = function (x, y, ignoredX, ignoredY)
	{
		var casillas = Juego.Tablero.casillas;
		var contColindantes = 0;

		if (checkPosFichas(x-1, y-1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x-1][y-1])) contColindantes++;
		if (checkPosFichas(x, y-1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x][y-1])) contColindantes++;
		if (checkPosFichas(x+1, y-1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x+1][y-1])) contColindantes++;
		if (checkPosFichas(x+1, y, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x+1][y])) contColindantes++;
		if (checkPosFichas(x+1, y+1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x+1][y+1])) contColindantes++;
		if (checkPosFichas(x, y+1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x][y+1])) contColindantes++;
		if (checkPosFichas(x-1, y+1, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x-1][y+1])) contColindantes++;
		if (checkPosFichas(x-1, y, ignoredX, ignoredY) && checkFichas(this.color, "distinto", casillas[x-1][y])) contColindantes++;

		if (contColindantes >= 1)
		{
			return true;
		}

		return false;
	};

	//Función que almacena en un array global las casillas principio y final que cumplen con la condición de formar una línea 
	//a favor de un jugador determinado (OTELLO)
	this.checkColindantesC = function (x, y, ignoredX, ignoredY)
	{
		var auxArrayPosFinal = new Array();
		var casillas = Juego.Tablero.casillas;
		var rivalColor;

		if (player1_Turn) rivalColor = 2;
		else rivalColor = 1;

		if (casillas[x][y].ficha.color != rivalColor)
		{	
			auxArrayPosFinal = checkAllDirectionsOtello(x, y, rivalColor);
			
			var i = 0;
			while (i < auxArrayPosFinal.length)
			{
				auxArrayPosFinal[i].pos_Inici.x = x;
				auxArrayPosFinal[i].pos_Inici.y = y;
				arrayOtello.push(auxArrayPosFinal[i]);
				i++;
			}
		}
	};

	//Función que calcula las ocho direcciones posibles y en caso de resultar favorables, las almacena en un array (OTELLO)
	function checkAllDirectionsOtello (x, y, rivalColor)
	{
		var auxArrayPosFinal = new Array();

		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 1, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 2, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 3, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 4, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 5, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 6, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 7, auxArrayPosFinal, 0);
		auxArrayPosFinal = recursiveFindColindantes(rivalColor, x, y, 8, auxArrayPosFinal, 0);

		return auxArrayPosFinal;	
	}


	//Función recursiva que comprueba en línea recta y una dirección si se cumple una serie de condiciones para que 
	//se permita colocar una ficha en determinadas casillas. Se almacena la información tanto de principio, final
	//y dirección para más adelante recorrerlas con dicha información
	function recursiveFindColindantes (colorContrario, x, y, dir, auxArray, cont)
	{
		var casillas = Juego.Tablero.casillas;

		var auxDir = getRecursirveDirection (x, y, dir);
		var recursiveX = auxDir.x;
		var recursiveY = auxDir.y;

		if (recursiveX >= 0 && recursiveX < Juego.Tablero.maxCasillas && recursiveY >= 0 && recursiveY < Juego.Tablero.maxCasillas)
		{
			var currentCasilla = casillas[recursiveX][recursiveY];

			if (currentCasilla.ficha != null)
			{
				if (currentCasilla.ficha.color === colorContrario)
				{
					cont++;
					auxArray = recursiveFindColindantes(colorContrario, recursiveX, recursiveY, dir, auxArray, cont);
				}
			}
			else
			{
				if (cont >= 1)
				{
					var auxPosInici = { x: -1, y: -1 };
					var auxPosFinal = { x: recursiveX, y: recursiveY };

					var auxPositions = 
					{
						pos_Inici: auxPosInici,
						pos_Final: auxPosFinal,
						direction: dir
					};
					auxArray.push(auxPositions);					
				}
			}
		}
		
		return auxArray;
	}

	//Función que devuelve el comportamiento de movimiento que debe seguirse según la dirección y la posición de la casilla
	function getRecursirveDirection (x, y, dir)
	{
		var auxDir = {x: x, y: y};

		switch (dir)
		{
			case 1:
			auxDir.x -= 1;
			break;

			case 2:
			auxDir.x -= 1;
			auxDir.y += 1;
			break;
			
			case 3:
			auxDir.y += 1;
			break;
			
			case 4:
			auxDir.x += 1;
			auxDir.y += 1;
			break;
			
			case 5:
			auxDir.x += 1;
			break;
			
			case 6:
			auxDir.x += 1;
			auxDir.y -= 1;
			break;						
			
			case 7:
			auxDir.y -= 1;
			break;

			case 8:
			auxDir.x -= 1;
			auxDir.y -= 1;	
			break;
		}

		return auxDir;
	}

	//Función para los dos primeros juegos que actualiza las fichas en HTML según su estado o felicidad
	this.updateFichaAB = function  ()
	{
		if (this.estado === 1)
		{
			if (this.color === 1)
			{
				$("#"+this.id).attr("draggable", "false");
				$("#"+this.id).attr('class', 'classFicha1_Normal');
			}
			else
			{
				$("#"+this.id).attr("draggable", "false");
				$("#"+this.id).attr('class', 'classFicha2_Normal');
			}
		}
		else
		{
			if (this.color === 1)
			{
				$("#"+this.id).attr("draggable", "true");
				$("#"+this.id).attr('class', 'classFicha1_Triste');
			}
			else
			{
				$("#"+this.id).attr("draggable", "true");
				$("#"+this.id).attr('class', 'classFicha2_Triste');
			}
		}
	};

	//Función que recorre el array previamente almacenado para actualizar los colores de las fichas intermedias entre
	//principio y final (OTELLO)
	this.updateFichaC = function ()
	{
		var casillas = Juego.Tablero.casillas;

		var i = 0;
		while (i < arrayOtello.length)
		{
			var pos_IniciX = arrayOtello[i].pos_Inici.x;
			var pos_IniciY = arrayOtello[i].pos_Inici.y;
			var pos_FinalX = arrayOtello[i].pos_Final.x;
			var pos_FinalY = arrayOtello[i].pos_Final.y;

			var auxColor = casillas[pos_IniciX][pos_IniciY].ficha.color;
			var auxDir = arrayOtello[i].direction;

			if (casillas[pos_FinalX][pos_FinalY].ficha != null)
			changeInterColor (pos_IniciX, pos_FinalX, pos_IniciY, pos_FinalY, auxColor, auxDir);

			i++;
		}
	}

	//Función que modifica el color de las fichas intermedias en el color de las que encierran esa línea (OTELLO)
	function changeInterColor (x, xFinal, y, yFinal, color, dir)
	{
		var casillas = Juego.Tablero.casillas;
		var auxDir = getRecursirveDirection (x, y, dir);
		var recursiveX = auxDir.x;
		var recursiveY = auxDir.y;
		var currentCasilla = casillas[recursiveX][recursiveY];		

		if (!(recursiveX === xFinal && recursiveY === yFinal))
		{
			currentCasilla.ficha.color = color;
			
			$("#"+currentCasilla.ficha.id).attr('class', 'classFicha'+color+'_Normal');
			changeInterColor(recursiveX, xFinal, recursiveY, yFinal, color, dir);
		}
	}

	//Función para los dos primeros juegos que representa las posibles ubicaciones de una ficha cuando ésta es
	//sobrepasada por el puntero del ratón
	this.overColindantesAB = function (x, y)
	{
		var casillas = Juego.Tablero.casillas;

		for (var i = 0; i < casillas.length; i++)
		{
			for (var j = 0; j < casillas.length; j++)
			{	
				if (casillas[i][j].ficha === null)
				{
					var auxId = "divCasilla_"+i+"_"+j;
					var auxColindantes = this.checkColindantes(i, j, x, y);

					if (auxColindantes)
					{
						$("#"+auxId).css("background-color","#DA70D6");
						$("#"+auxId).attr("ondrop", "dropFicha(event)");
						$("#"+auxId).attr("ondragover", "allowDrop(event)");
					}
					else
					{
						$("#"+auxId).attr("ondrop", "");
						$("#"+auxId).attr("ondragover", "");
					}
				}
			}
		}	
	};

	//Función que comprueba que la posición de las fichas existe en determinados rangos de casillas
	//Los ignoredX e Y son parámetros que indican la posición que debe ser ignorada ya que en algunos casos la ficha que quiere
	// colocarse se cuenta a sí misma por lo que no hay que tomarla en cuenta a la hora de ubicarse en otra casilla
	function checkPosFichas (x, y, ignoredX, ignoredY)
	{
		var maxCasillas = Juego.Tablero.maxCasillas;
		if ((x >= 0 && x < maxCasillas) && (y >= 0 && y < maxCasillas) && !(ignoredX === x && ignoredY === y)) return true;

		return false;
	}

	//Comprueba si el color colindante o vecino es el correcto para determinado tipo de juego (primero o segundo)
	function checkFichas (color, colorFeliz, casillaColindante)
	{
		if (casillaColindante.ficha != null)
		{
			if (colorFeliz === "mismo") 
			{
				if (casillaColindante.ficha.color === color) return true;
			}
			else 
			{
				if (casillaColindante.ficha.color != color) return true;
			}
		}
			
		return false;
	}

	//Función que genera las fichas del primer y segundo juego con sus determinadas condiciones como por ejemplo su existencia
	this.createFichaAB = function ()
	{
		var auxState = Math.floor(Math.random()*(2)+0);

		if (auxState !== 0)
		{
			var auxColor = Math.floor(Math.random()*(2)+1);
			fichasCont++;

			switch (Juego.currentGame)
			{
				case 1:
				this.ficha = new fichasFN("ficha_"+fichasCont, auxColor, auxState, Juego.normas.checkColindantesA, 
					Juego.normas.updateFichaAB, Juego.normas.overColindantesAB);
				break;

				case 2:
				this.ficha = new fichasFN("ficha_"+fichasCont, auxColor, auxState, Juego.normas.checkColindantesB, 
					Juego.normas.updateFichaAB, Juego.normas.overColindantesAB);
				break;
			}
		}
		else this.ficha = null;		
	};

	//Función que permite asignar o generar las fichas del tablero a partir de la partida guardada en JSON
	this.setFichasFromLoad = function()
	{
		fichasCont = 0;
		var casillas = Juego.Tablero.casillas;

		var loadCasilla = partidaLoad.Tablero.casillas[this.x][this.y];
		if (loadCasilla.ficha != null)
		{
			switch (Juego.currentGame)
			{
				case 1:
				this.ficha = new fichasFN(loadCasilla.ficha.id, loadCasilla.ficha.color, loadCasilla.ficha.estado, Juego.normas.checkColindantesA, 
					Juego.normas.updateFichaAB, Juego.normas.overColindantesAB);
				break;

				case 2:
				this.ficha = new fichasFN(loadCasilla.ficha.id, loadCasilla.ficha.color, loadCasilla.ficha.estado, Juego.normas.checkColindantesB, 
					Juego.normas.updateFichaAB, Juego.normas.overColindantesAB);
				break;
				case 3:
				this.ficha = new fichasFN(loadCasilla.ficha.id, loadCasilla.ficha.color, loadCasilla.ficha.estado, Juego.normas.checkColindantesC, 
					Juego.normas.updateFichaC);
			}
		}
		else
		{
			this.ficha = null;
		}
	}

	//Función para OTELLO que genera cuatro fichas iniciales de ambos colores (50%) en el centro del tablero
	this.createFichaC = function ()
	{
		if ((this.x === 3 && this.y === 3) || (this.x === 4 && this.y === 4)) 
		{
			fichasCont++;
			this.ficha = new fichasFN("ficha_"+fichasCont, 1, 1, Juego.normas.checkColindantesC, 
				Juego.normas.updateFichaC);				
		}
		else 
		if ((this.x === 4 && this.y === 3) || (this.x === 3 && this.y === 4)) 
		{
			fichasCont++;
			this.ficha = new fichasFN("ficha_"+fichasCont, 2, 1, Juego.normas.checkColindantesC, 
				Juego.normas.updateFichaC);	
		}
		else this.ficha = null;
	};

	//Función para los dos primeros juegos que dibuja las fichas con sus condiciones en HTML
	this.printFichasAB = function (color, id)
	{
		var code = "";

		if (color === 1)
		{
			code += "<img src='img/ficha1_Normal.png' id="+id+" class='classFicha1_Normal' alt='ficha1'";
			code += " onmouseover='mouseOverFicha(\""+id+"\")' onmouseleave='mouseLeaveFicha();'";
			code += " draggable='true' ondragstart='dragFicha(event)'>";	
		}
		else
		{
			code += "<img src='img/ficha2_Normal.png' id="+id+" class='classFicha2_Normal' alt='ficha2'";
			code += " onmouseover='mouseOverFicha(\""+id+"\")' onmouseleave='mouseLeaveFicha();'";
			code += " draggable='true' ondragstart='dragFicha(event)'>";	
		}

		return code;		
	};

	//Función para OTELLO que dibuja las fichas con sus condiciones en HTML
	this.printFichasC = function (color, id)
	{
		var code = "";

		if (color === 1)
		{
			code += "<img src='img/ficha1_Normal.png' id="+id+" class='classFicha1_Normal' alt='ficha1'>";	
		}
		else
		{
			code += "<img src='img/ficha2_Normal.png' id="+id+" class='classFicha2_Normal' alt='ficha2'>";	
		}

		return code;		
	};	
};