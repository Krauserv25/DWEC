/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS RELACIONADOS CON LA INTERFAZ DE LA WEB (FRONT-END)
	AUTOR: IVAN VALERA
*/

var flickrAjaxUI = 
{
	//Método que anima el panel derecho de filtrado
	showTagsPanel: function()
	{
		$('#divFiltros').animate({ marginRight: "25%"} , 1500);
	},
	//Método que añade cada uno de los tags en el dropdown correspondiente
	addTagsInDropdown: function(tags)
	{
		$('#tagsSelect').empty();

		for (var j = 0; j < tags.length; j++) 
		{
			var codeTags = '<option value="tag"'+j+'>'+tags[j]+'</option>';
			$('#tagsSelect').append(codeTags); 
		};
	},
	//Método que activa o desactiva un botón de la web mientras se producen peticiones
	enableButtons: function(button, mode)
	{
		if (mode === 'hide')
		{
			button.prop( "disabled", true );
			button.css("opacity", "0.5");
		}		
		else
		{
			button.prop( "disabled", false );
			button.css("opacity", "1");		
		}
	}
};