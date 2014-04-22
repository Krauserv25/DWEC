/*
	DESCRIPCION: SCRIPT QUE TRATA LOS EVENTOS PRODUCIDOS EN EL JUEGO
	AUTOR: IVAN VALERA
*/

//Eventos que se cargarán y asignarán una vez cargado el DOM
$(document).ready(function()
{
	//Evento focus para la caja rápida
		//Evento keydown para la caja rápida
		$('#textBoxCajaRapida').focus(function()
			{
				$(document).keydown(function(tecla)
				{
		            if (tecla.keyCode === 13) //Tecla ENTER
		            {
		            	alert("dentro");
		            }
        		});
			});

	//Evento click para botón "Dame Pistas"
	$('.classButtonPistas').click(function()
	{
		masterUI.MostrarPistasEnLista();
	});

	//Evento para el slider
	  $('#slider-range-min').slider(
	  {
	      range: "min",
	      value: 8,
	      min: 1,
	      max: 10,
	      slide: function( event, ui ) 
	      {
	      	//Aquí se actualiza la cantidad de intentos para las cookies
	        $('#labelResultSlider').text( ui.value );
      	  }
    });

	  $('.dragColor').draggable({revert: "invalid", refreshPositions: true,
			drag: function(event, ui)
			{
				$(this).css("z-index", "2");
			}
	  	});

	  $('.dropCircle').droppable({
	  		drop: function(ev, ui) 
			{
				if (ui.draggable.hasClass('colorRed')) $(this).addClass('colorRed');
				if (ui.draggable.hasClass('colorBlue')) $(this).addClass('colorBlue');
				if (ui.draggable.hasClass('colorGreen')) $(this).addClass('colorGreen');
				if (ui.draggable.hasClass('colorYellow')) $(this).addClass('colorYellow');
				if (ui.draggable.hasClass('colorPurple')) $(this).addClass('colorPurple');
				if (ui.draggable.hasClass('colorGrey')) $(this).addClass('colorGrey');

				ui.draggable.remove();
			}
	  });
});