/*
	FUNCIÓN: Controla los métodos o funciones de la clase casilla
	AUTOR: IVAN VALERA
*/

var casilla = function()
{
	this.ficha = null;

	this.createFicha = function(type)
	{
		this.ficha = new ficha(type);
	};
};