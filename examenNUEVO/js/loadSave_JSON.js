
//Función que lee el contenido del archivo seleccionado
function readJsonFile(evt) 
{
	var fileJSON;

	var files = document.getElementById('loadJSON').files;

	if (!files.length) 
	{
	  alert('Debes seleccionar un archivo .json');
	  return;
	}
	else
	{
		var fileJSON = files[0];
		var auxSplit = files[0].name.split('.');

		if (auxSplit[1] != "json")
		{
			alert('Debes seleccionar un archivo .json');
			return;
		}
	}

	var reader = new FileReader();

	// If we use onloadend, we need to check the readyState.
	reader.onloadend = function(evt) 
	{
	  if (evt.target.readyState == FileReader.DONE) 
	  {
	  	var auxPartida = JSON.parse(evt.target.result);
	  	loadPartida(auxPartida);
	  }
	};

	var blob = fileJSON.slice(parseInt(0), parseInt(fileJSON.size - 1)+1);
	reader.readAsText(blob);
}

//Función que empieza un nuevo juego con los datos almacenados de la partida guardada
function loadPartida (partida)
{
	var nombrePartida = partida.juego[0].nombre;

	var personajes = partida.juego[0].personajes;

	Juego = new JuegoFN(nombrePartida);

	var totalPersonajes = parseInt(personajes.length);

	var i;
	for (i = 0; i < totalPersonajes; i++)
	{
		if (personajes.raza === "Guerrero")
		{
			 Juego.personajes[i] = new personajeFN(personajes[i].nombre, personajes[i].apellidos,
			 personajes[i].raza, parseInt(personajes[i].nvMagia), parseInt(personajes[i].nvFuerza), parseInt(personajes[i].nvIntel), Juego.comportamiento.calculateGuerrero);
		}
		else
		{
			Juego.personajes[i] = new personajeFN(personajes[i].nombre, personajes[i].apellidos,
			 personajes[i].raza, parseInt(personajes[i].nvMagia), parseInt(personajes[i].nvFuerza), parseInt(personajes[i].nvIntel), Juego.comportamiento.calculateMago);			
		}

		Juego.personajes[i].calculateAttack();
	}

	showInfoGame();

	//var func = new Function("x", "y", "return x*y;");

	/*JuegoFN.prototype.listPersonajes = function()
	{
		alert(partida.juego[0].listPersonajes);
	};*/

	/*
		$('#divDatosPersonajes').html(code);"}
	*/

	JuegoFN.prototype.listPersonajes = new Function(partida.juego[0].listPersonajes);

	Juego.listPersonajes();
	prepareToSavePartida();	
}

function prepareToSavePartida ()
{
	var code = "";

	$("#linkJSON").remove();
	var jsonPartida = JSON.stringify(Juego); //Convertimos el objeto que deseamos en json

	//Esto sirve para indicar que los datos en json van a ser almacenados en un archivo
	var data = "text/json;charset=utf-8," + encodeURIComponent(jsonPartida); 

	//Genera el enlace de descarga del archivo con los datos en json
	code += '<a id="linkJSON" href="#" download="examenPartida.json" onclick="prepareToSavePartida();">SAVE GAME</a>';

	$("#divSaveLoad").append(code);
	$("#linkJSON").attr("href", "data:"+data);
}