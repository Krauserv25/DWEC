
function getTeamColor (code)
{
	var auxColor;

	switch(code)
	{
		case 1:
		auxColor = "Black";
		break;

		case 2:
		auxColor = "Blue";
		break;

		case 3:
		auxColor = "Red";
		break;

		case 4:
		auxColor = "Green";
		break;

		case 5:
		auxColor = "Orange";
		break;

		case 6:
		auxColor = "Purple";
		break;
	}

	return auxColor;
}

//Función que devuelve el elemento div que contiene el id pasado
function getElementHTML (id)
{
	return document.getElementById(id);
}

function getTeamName()
{
    var url = location.search;
    var splitUrl = url.split("=");

    return splitUrl[1];
}