
var Juego;
var globalDebug = false;

var JuegoFN = function (n)
{
	this.nombre = n;
	this.personajes = new Array();
	this.comportamiento = new comportamientoFN();

	/*this.listPersonajes = function()
	{
		var code = "";
		var i;
		"var attacks = new Array();

		for (i = 0; i < this.personajes.length; i++)
		{
			attacks.push(this.personajes[i].attack);
		}

		attacks.sort();

		for (i = 0; i < this.personajes.length; i++)
		{
			code += "Nombre: " + this.personajes[i].nombre + ' ' + this.personajes[i].apellidos;
			code += "<br />Raza: " + this.personajes[i].raza + "<br />Magia: " + this.personajes[i].nvMagia;
			code += "<br />Fuerza: " + this.personajes[i].nvFuerza + "<br />Inteligencia: " + this.personajes[i].nvIntel;
			code += "<br />Ataque Total: " + this.personajes[i].attack;
			code += "<br />";
		}

		"var code = '';

		for (i = 0; i < this.personajes.length; i++)
		{
			code += 'Nombre: ' + this.personajes[i].nombre + " " + this.personajes[i].apellidos;
			code += '<br />Raza: ' + this.personajes[i].raza + '<br />Magia: ' + this.personajes[i].nvMagia;
			code += '<br />Fuerza: ' + this.personajes[i].nvFuerza + '<br />Inteligencia: ' + this.personajes[i].nvIntel;
			code += '<br />Ataque Total: ' + this.personajes[i].attack;
			code += '<br />';
		}

		$('#divDatosPersonajes').html(code);"
	};*/

	this.debug = globalDebug;
}

var personajeFN = function (n, ap, raza, nvMagia, nvFuerza, nvIntel, calculateRaza)
{
	this.nombre = n
	this.apellidos = ap;
	this.raza = raza;
	this.nvMagia = nvMagia;
	this.nvFuerza = nvFuerza;
	this.nvIntel = nvIntel;

	this.calculateAttack = calculateRaza;

	this.debug = function()
	{
		if (Juego.debug)
		{
			console.log(this);
		}
	};
}

function init ()
{
	document.getElementById('loadJSON').addEventListener('change', readJsonFile, false);
	/*Juego = new JuegoFN("partida1");

	Juego.personajes[0].calculateAttack();
	Juego.personajes[1].calculateAttack();
	showInfoGame();
	Juego.listPersonajes();*/
	prepareToSavePartida();
}

function showInfoGame ()
{
	var code = "";
	code += "Nombre Juego: " + Juego.nombre + "<br /> Debug: "+ Juego.debug + "<br /><br /><br />";

	$('#divDatosJuego').html(code);
}