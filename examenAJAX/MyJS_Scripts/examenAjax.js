/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LOS CÁLCULOS DE LA WEB (BACK-END)
	AUTOR: IVAN VALERA
*/

var examenAjax = 
{
	//Método que construye un objeto con los datos necesarios para la petición de Ajax y llama a la misma
	createAjaxData: function(id)
	{
		var data =
		{
			id: id
		};

		ajaxCalls.examenAjaxLoad(data);
	}
};