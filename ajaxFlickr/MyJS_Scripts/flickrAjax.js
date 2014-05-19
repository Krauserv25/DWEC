/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LOS CÁLCULOS DE LA WEB (BACK-END)
	AUTOR: IVAN VALERA
*/

var flickrAjax = 
{
	//Método que construye un objeto con los datos necesarios para la petición de Ajax y llama a la misma
	createAjaxData: function(id, format, tags, tagmode, max)
	{
		var data =
		{
			id: id,
			format: format,
			tags: tags,
			tagmode: tagmode
		};

		ajaxCalls.imagesAjaxLoad(data, max);
	}
};