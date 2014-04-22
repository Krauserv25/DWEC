//Script que almacena o carga partidas del juego en JSON.

var partidaLoad = null;

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

		if (!fileJSON.type.match('json.*'))
		{
			alert('Debes seleccionar un archivo .json');
			return;
		}
	}
	      
	var start = parseInt(0);
	var stop = parseInt(fileJSON.size - 1);

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

	var blob = fileJSON.slice(start, stop + 1);
	reader.readAsBinaryString(blob);
}

//Función que prepara el link de descarga de una partida con los datos actuales del juego
function prepareToSavePartida ()
{
	var code = "";

	$("#linkSaveGame").remove();
	var jsonPartida = JSON.stringify(Juego);

	var data = "text/json;charset=utf-8," + encodeURIComponent(jsonPartida);

	code += '<a id="linkSaveGame" href="#" download="partidaNueva.json" onclick="prepareToSavePartida();">SAVE GAME</a>';

	$("#divSaveLoad").append(code);
	$("#linkSaveGame").attr("href", "data:"+data);
}

//Función que empieza un nuevo juego con los datos almacenados de la partida guardada
function loadPartida (partida)
{
	isInLoad = true;
	partidaLoad = partida;

	$("#divTablero").empty();
	$("#divInfoGames").hide(true);

	var currentPartida = parseInt(partida.currentGame);
	Juego = new juegoFN(currentPartida);
	Juego.createTablero(8);

	selectGameItem(currentPartida);

	if (currentPartida === 3) 
	{
		calculateOtelloPoints();
		$("#divInfoGames").show();
	}
}