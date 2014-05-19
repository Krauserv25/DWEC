/*
	DESCRIPCION: SCRIPT QUE TRATA LOS EVENTOS PRODUCIDOS EN LA WEB
	AUTOR: IVAN VALERA
*/

//Eventos que se cargarán y asignarán una vez cargado el DOM
$(document).ready(function()
{	
	examenAjax.createAjaxData('');

	$(document).on('click', '.classSeries', function()
	{
		examenAjax.createAjaxData($(this).attr('title'));
	});
});