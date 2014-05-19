/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS PARA LAS PETICIONES DE AJAX
	AUTOR: IVAN VALERA
*/

var ajaxCalls =
{
	examenAjaxLoad: function()
	{  
       $.ajax({
       	url:"http://www.bbc.co.uk/tv/programmes/genres/drama/scifiandfantasy/schedules/upcoming.json?jsonCallback=?",

       	success:function(result)
       	{
  			examenAjaxUI.showSeries(result.broadcasts);
		}});
	}
};