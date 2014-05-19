/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LA INTERFAZ DE LA WEB (FRONT-END)
	AUTOR: IVAN VALERA
*/

var examenAjaxUI = 
{
	//Función que muestra las series
	showSeries: function(info)
	{
		var code = '';
		for(var i = 0; i < info.length; i++)
		{
			var auxClass = "classNormal";

			if (info[i].programme.programme)
			{
				if (info[i].programme.programme.type === "series")
				{
					auxClass = "classSeries";
				}				
			}
			else auxClass = "classNormal";	

			code += '<div title="'+info[i].programme.title+'" class='+auxClass+'>'+info[i].programme.title+'</div>';
		}
		$('#divSeries').append(code);
	}
};