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
		//Paso 1: Copiar al auxiliar los datos de la combinación oculta
		//Paso 2: Comprobar cuántas han sido correctas y bien ubicadas
		//Paso 3: Según los aciertos se sigue jugando o bien termina en victoria
		//Paso 4: En caso de seguir el juego se comprueba la cantidad de intentos sobre los posibles
		//Paso 5: En caso de superarlos se pierde la partida. En caso contrario se sigue el juego.
		//Paso 6: Se comprueba las que están KO (correctas mal ubicadas)
		//Paso 7: Se incrementa la cantidad de intentos actuales y se procede con una nueva fila de juego 
		master.aux_CombOculta = config.combOculta.slice();
		
		var totalCorrectas = master.CuantasOK();

		if (totalCorrectas < 5)
		{
			if (config.currentFilaNum < parseInt($('#labelResultSlider').text()))
			{
				master.CuantasKO();

				config.currentFilaNum++;

				masterUI.MostrarPistasEnLista();
				master.setDroppable();
			}
			else masterUI.ShowFinalModal('¡HAS PERDIDO!');
		}
		else
		{
			masterUI.ShowFinalModal('¡ENHORABUENA!');
		}
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