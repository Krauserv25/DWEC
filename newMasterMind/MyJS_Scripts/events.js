/*
	DESCRIPCION: SCRIPT QUE TRATA LOS EVENTOS PRODUCIDOS EN EL JUEGO
	AUTOR: IVAN VALERA
*/

//Eventos que se cargarán y asignarán una vez cargado el DOM
$(document).ready(function()
{
	//Paso 1: Generar un código secreto
	//Paso 2: Mostrar la primera fila para jugar
	//Paso 3: Hacer dropables y dragables los elementos adecuados
	master.GenerarCodigoOculto();
	utils.log(config.combOculta);

	masterUI.MostrarPistasEnLista();

	//Evento click para botón "Dame Pistas"
	$('#inputPasarTurno').click(function()
	{
		master.nextIntent();
	});

	//Evento para el slider
	 $('#divSlider').slider(
	  {
	      range: "min",
	      value: 8,
	      min: 1,
	      max: 10,
	      slide: function( event, ui ) 
	      {  	
	        $('#labelResultSlider').text(ui.value);
	        utils.saveIntentsCookies(); //Aquí se actualiza la cantidad de intentos para las cookies
      	  }
    });

	 //Permite dragabilidad y dropabilidad para los elementos correspondientes
	master.setDraggable();
	master.setDroppable();

	//Evento de doble click sobre los colores introducidos por el usuario que permite eliminar o deshacer un color
	$(document).on("dblclick", ".dropCircle", function()
	{
		masterUI.ModificarColorClavija($(this).children(), 0);
	});

	//Evento de click sobre el botón de reinicio del juego para empezar de nuevo una partida
	$(document).on("click", ".classRestartGame", function()
	{
		masterUI.BorrarListaPistas();
	});

	utils.getIntentsCookies();
});