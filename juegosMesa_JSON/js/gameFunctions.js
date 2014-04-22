//En este script se reúnen las distintas clases que forman el juego y las variables globales.
var Juego;
var fichasCont = 0;

var currentFicha;
var player1_Turn = true;
var arrayOtello = new Array();
var totalFichasOtello =
{
	rojo: 2,
	azul: 2
};

//juegoFN es la clase propia del juego. Se trata de la clase principal que se instancia al iniciar una partida
var juegoFN = function(currentGame)
{
	this.normas = new normasFN();
	this.currentGame = currentGame;

	this.createTablero = function(n) //Esta función genera un tablero de juego cuando es llamada
	{
		if (Juego.currentGame === 3) this.Tablero = new tableroFN(n, Juego.normas.printFichasC);
		else this.Tablero = new tableroFN(n, Juego.normas.printFichasAB); 
		this.Tablero.init();
		this.Tablero.printTablero();

		if (this.currentGame === 3) changeTurn();
		else updateGame();
	};
};

//Esta clase declara el tablero de juego y sus propiedades
var tableroFN = function(max, printFichas)
{
	this.maxCasillas = max;
	this.printFichas = printFichas;

	this.casillas = new Array(this.maxCasillas);

	for (var i = 0; i < this.maxCasillas; i++)
	{
		this.casillas[i] = new Array(this.maxCasillas); //El tablero está formado por casillas almacenadas en un array bidimensional
	}

	this.init = function() //Esta función genera las casillas del tablero y las fichas de las mismas (si es posible)
	{
		for (var i = 0; i < this.maxCasillas; i++)
		{
			for (var j = 0; j < this.maxCasillas; j++)
			{
				if (isInLoad)
				{
					if (Juego.currentGame === 3) this.casillas[i][j] = new casillasFN(i, j, Juego.normas.setFichasFromLoad);
					else this.casillas[i][j] = new casillasFN(i, j, Juego.normas.setFichasFromLoad);				
				}
				else
				{
					if (Juego.currentGame === 3) this.casillas[i][j] = new casillasFN(i, j, Juego.normas.createFichaC);
					else this.casillas[i][j] = new casillasFN(i, j, Juego.normas.createFichaAB);				
				}
				this.casillas[i][j].createFicha();
			}
		}
	};

	this.printTablero = function() //Esta función dibuja con HTML el tablero con sus casillas y fichas previamente generadas
	{
		var code = "";
		var auxId = "";

		for (var i = 0; i < this.casillas.length; i++)
		{
			for (var j = 0; j < this.casillas.length; j++)
			{
				auxId = "divCasilla_"+i+"_"+j;

				code += "<div id="+auxId+" class='classCasillas'";
				if (Juego.currentGame === 3) 
				{
					code += " onclick='clickInOtello("+i+", "+j+");'";
					code += " onmouseover='overInOtello("+i+", "+j+");'";
					code += " onmouseleave='cleanBackCasilla("+i+", "+j+");'";
				}
				
				if (this.casillas[i][j].ficha != null)
					code += ">"+this.printFichas(this.casillas[i][j].ficha.color, this.casillas[i][j].ficha.id);
				else code += ">";
				code += "</div>";
			}
		}

		$("#divTablero").append(code);
	};
};

//Clase que declara las casillas y sus propiedades
var casillasFN = function(x, y, createFicha)
{
	this.x = x;
	this.y = y;
	this.ficha;

	this.createFicha = createFicha; //Se asigna mediante callback una función que permite generar una ficha dentro de la casilla
};

//Clase que declara las fichas y sus propiedades
var fichasFN = function(id, color, state, checkColindantes, updateFicha, overColindantes)
{
	this.id = id;
	this.color = color;
	this.estado = state;
	//funciones callback que asignan el comportamiento de las fichas
	this.checkColindantes = checkColindantes;
	this.updateFicha = updateFicha;
	this.overFicha = overColindantes;
};