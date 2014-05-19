/*
	DESCRIPCION: SCRIPT QUE TRATA LOS EVENTOS PRODUCIDOS EN LA WEB
	AUTOR: IVAN VALERA
*/

//Eventos que se cargarán y asignarán una vez cargado el DOM
$(document).ready(function()
{	
	//Método que establece el focus en el campo de texto de la ID para mayor comodidad al usuario
	$('#inputUserID').focus();

	//Evento para el botón de cargado de imágenes de Flickr
	$('#buttonLoadAjax').click(function()
	{
		var userID = $('#inputUserID').val();

		flickrAjax.createAjaxData(userID, 'json', "", "all", 20);
		config.currentID = userID;
		flickrAjaxUI.enableButtons($(this), 'hide');
	});

	//Evento que recoge cuando se cambia la selección de un radiobutton
	$("input[name=tagFormat]:radio").change(function()
	{
		var text = $(this).attr("texto");
		config.currentTagmode = text;
	});

	//Evento para el botón de cargado de imágenes de Flickr con flitrado
	$('#buttonFilter').click(function()
	{
		var maxSelected = parseInt($('#maxImagesSelect').find(":selected").text());
		var tag = $('#tagsSelect').find(":selected").text();

		var auxTagsCadena = "";

		$('#tagsSelect :selected').each(function(i, selected)
		{
		  	auxTagsCadena += $(selected).text()+',';
		});

		if (auxTagsCadena.length != 0)
		{
			auxTagsCadena = auxTagsCadena.substring(0, auxTagsCadena.length-1);
		}

		flickrAjax.createAjaxData(config.currentID, 'json', auxTagsCadena, config.currentTagmode, maxSelected);	

		flickrAjaxUI.enableButtons($(this), 'hide');
	});	
});