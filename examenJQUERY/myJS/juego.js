/*
	FUNCIÓN: Controla los métodos o funciones de la clase general del juego
	AUTOR: IVAN VALERA
*/

var juego = function(isCooking)
{
	this.normas;
	this.tablero;
	this.isCooking = isCooking;

	this.initJuego = function()
	{
		this.tablero = new tablero();
		this.tablero.initTablero();
	};
};