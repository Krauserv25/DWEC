/*
	FUNCIÓN: Controla los métodos o funciones de la clase tablero
	AUTOR: IVAN VALERA
*/

var tablero = function()
{
	this.casillas = new Array(3);

	this.initTablero = function()
	{
		for (var i = 0; i < this.casillas.length; i++) 
		{
			this.casillas[i] = new Array(3);
		};

		for (var i = 0; i < this.casillas.length; i++) 
		{
			for (var j = 0; j < this.casillas.length; j++) 
			{
				this.casillas[i][j] = new casilla();
				examenFN_UI.drawCasillas("casilla_"+i+"_"+j);
			}
		}
	};

	this.getCasilla = function(id)
	{
		var split = id.split('_');
		var auxX = parseInt(split[1]);
		var auxY = parseInt(split[2]);

		return this.casillas[auxX][auxY];
	};
};