/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS PARA LAS PETICIONES DE AJAX
	AUTOR: IVAN VALERA
*/

var ajaxCalls =
{
	imagesAjaxLoad: function(data, max)
	{
       $.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            dataType: "jsonp",
            type: 'get',
            data: data,
            complete: function(jqXHR, textStatus) 
            {
                flickrAjaxUI.showTagsPanel();
                flickrAjaxUI.enableButtons($('#buttonLoadAjax'), 'show');
                flickrAjaxUI.enableButtons($('#buttonFilter'), 'show');
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                console.log(errorThrown);
            },
            success: function(response) //Método que se llama en caso de que la petición haya sido correcta
            {
                $('#divImages').empty();
                var items = response.items;
                var i = 0;

                //Se recoge la información necesaria para representar los datos en la web
                while (i < items.length && i < max)
                {
                    var codeImage = '<a href="'+items[i].link+'">';

                    codeImage += '<img src="'+items[i].media.m+'" title="'+items[i].title+'" class="classImages"/></a>';
                    $(codeImage).appendTo('#divImages');

                    var auxTags = items[i].tags.split(' ');
                    flickrAjaxUI.addTagsInDropdown(auxTags);

                    i++;
                }
            }
        })		
	}
};