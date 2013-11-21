
var totalCorredoresInTeamRegister;
var editID;
var arrayTeams;
var color;

function init ()
{
	getElementHTML("buttonPlay").disabled = true;
	getElementHTML("buttonAddTeam").disabled = true;

	getElementHTML("buttonEditTeam").style.display = 'none';

	totalCorredoresInTeamRegister = 0;
	editID = 1;
	color = 1;
	arrayTeams = new Array();
}

function showAddTeam (operation)
{
	cleanAddTeam(function()
		{
			getElementHTML("articleIndexTeams").style.display = 'none';
			getElementHTML("articleAddTeams").style.display = 'block';

			getElementHTML("InputTeamName").focus();

			if (operation === 1)
			{
				getElementHTML("buttonAddTeam").style.display = 'inline-block';
				getElementHTML("buttonEditTeam").style.display = 'none';
			}
			else
			{
				getElementHTML("buttonAddTeam").style.display = 'none';
				getElementHTML("buttonEditTeam").style.display = 'inline-block';
			}
		});
}

function fillInfoToEdit (id)
{
	editID = id;

	getElementHTML("InputTeamName").value = arrayTeams[id-1].nombre;

	totalCorredoresInTeamRegister = 0;

	var i;
	var corredores = arrayTeams[id-1].corredores;
	var maxCorredores = corredores.length;

	for (i = 0; i < maxCorredores; i++)
	{
		appendCorredores(corredores[i]);	
	}

	var auxColor = arrayTeams[id-1].color;
	getElementHTML("imageColor").src = "images/snail"+getTeamColor(auxColor)+".png";
}

function cancelAddTeam ()
{
	getElementHTML("articleAddTeams").style.display = 'none';
	getElementHTML("articleIndexTeams").style.display = 'block';
}

function cleanAddTeam (viewCallback)
{
	//Campo del nombre de equipo
	getElementHTML("InputTeamName").value = "";
	var auxContainerCorredores = getElementHTML("divContainerCorredores");

	//Borrado de todos los posibles corredores agregados
	var count = auxContainerCorredores.getElementsByTagName("div").length;
	totalCorredoresInTeamRegister = 0;

	var i;

	for (i = 1; i <= count; i++)
	{
		var divCorredorX = document.getElementById("divAddCorredores"+i);
		auxContainerCorredores.removeChild(divCorredorX);
	}

	//Color del caracol por defecto
	color = 1;
	getElementHTML("imageColor").src = "images/snail"+getTeamColor(1)+".png";

	//Desactivamos el botón de añadir
	getElementHTML("buttonAddTeam").disabled = true;

	viewCallback();
}

function changeSnailColor (code)
{
	var auxColor = getTeamColor(code);
	getElementHTML("imageColor").src = "images/snail"+auxColor+".png";

	color = code;
}

function appendCorredores (sel)
{
	if (totalCorredoresInTeamRegister < 5)
	{
		totalCorredoresInTeamRegister++;
		var iDiv = document.createElement('div');
		iDiv.id = 'divAddCorredores'+totalCorredoresInTeamRegister;
		iDiv.className = 'classAddCorredores';

		iDiv.innerHTML = getInnerCorredorCode(totalCorredoresInTeamRegister, sel);
		getElementHTML("divContainerCorredores").appendChild(iDiv);

		checkInfoRegister();
	}
}

function removeCorredores (id)
{
	var divCorredorX = getElementHTML("divAddCorredores"+id);
	var auxContainerCorredores = getElementHTML("divContainerCorredores");
	auxContainerCorredores.removeChild(divCorredorX); 

	var count = auxContainerCorredores.getElementsByTagName("div").length;
	totalCorredoresInTeamRegister = count;
	count++; //Sumamos uno a la cantidad debido a que borramos uno

	var i;

	for (i = id; i < count; i++)
	{
		var innerDiv = getElementHTML("divAddCorredores"+(i+1));
		innerDiv.id = "divAddCorredores"+i;
		innerDiv.className = 'classAddCorredores';
		//var selectTipo = innerDiv.getElementsByClass('classSelect'); ¡¡¡¡¡¡NO ME RECONOCE LA FUNCION!!!!!
		var selectTipo = innerDiv.getElementsByTagName("select")[0];
		var sel = selectTipo.selectedIndex;
		innerDiv.innerHTML = getInnerCorredorCode(i, sel);
	}

	checkInfoRegister();
}

function getInnerCorredorCode (id, sel)
{
	var code = "<button type='button' class='classImageButton classRemoveButton' onclick='removeCorredores("+id+")'><img src='images/removeButton_Normal.png'";
	code += " class='classRemoveImage' alt='removeButton' title='Elimina este corredor del equipo'></button><span>Corredor "+id+":</span>";

	if (sel === 0)
	{
		code += "<select class='classSelect'><option value='1' selected>GREGARIO</option><option value='2'>JEFE DE FILAS</option></select>";
	}
	else
	{
		code += "<select class='classSelect'><option value='1'>GREGARIO</option><option value='2' selected>JEFE DE FILAS</option></select>";
	}

	return code;
}

function checkInfoRegister ()
{
	if (getElementHTML("InputTeamName").value != "" && totalCorredoresInTeamRegister >= 1)
	{
		getElementHTML("buttonAddTeam").disabled = false;
		getElementHTML("buttonEditTeam").disabled = false;
	}
	else 
	{
		getElementHTML("buttonAddTeam").disabled = true;
		getElementHTML("buttonEditTeam").disabled = true;
	}
}

function addNewTeam (operation)
{
	var arrayCorredores = new Array();
	var nombreTeam = getElementHTML("InputTeamName").value;
	var auxContainerCorredores = getElementHTML("divContainerCorredores");
	
	var i;
	var count = auxContainerCorredores.getElementsByTagName("div").length;
	count++;

	for (i = 1; i < count; i++)
	{
		var innerDiv = getElementHTML("divAddCorredores"+i);
		var selectTipo = innerDiv.getElementsByTagName("select")[0];
		var sel = selectTipo.selectedIndex;

		arrayCorredores.push(sel);
	}

    if (operation === 1)
    {
    	var auxTeam = 
	    {
	    	id: arrayTeams.length+1,
	        nombre: nombreTeam,
	        corredores: arrayCorredores,
	        color: color
	    };

    	arrayTeams.push(auxTeam);
		appendTeam();
    }
    else
    {
	    var auxTeam = 
	    {
	    	id: editID,
	        nombre: nombreTeam,
	        corredores: arrayCorredores,
	        color: color
	    };

	    arrayTeams[editID-1] = auxTeam;
	    getElementHTML("divAddTeam"+editID).innerHTML = getInnerTeamCode(editID);
    }

	getElementHTML("articleAddTeams").style.display = 'none';
	getElementHTML("articleIndexTeams").style.display = 'block';
}

function appendTeam ()
{
	var totalTeams = arrayTeams.length;

	if (totalTeams < 5)
	{
		var iDiv = document.createElement('div');
		iDiv.id = 'divAddTeam'+totalTeams;
		iDiv.className = 'classAddCorredores';

		iDiv.innerHTML = getInnerTeamCode(totalTeams);
		getElementHTML("divContainerEquipos").appendChild(iDiv);
	}

	checkCountTeams();
}

function getInnerTeamCode (id)
{
	var nombre = arrayTeams[id-1].nombre;
	var color = arrayTeams[id-1].color;
	var corredores = arrayTeams[id-1].corredores;
	var i;
	var maxCorredores = corredores.length;

	var code = "<button type='button' class='classImageButton classRemoveButton' onclick='removeTeams("+id+");'><img src='images/removeButton_Normal.png'";
	code += " class='classRemoveImage' alt='removeButton' title='Elimina este equipo de la lista'></button>";

	code += "<button type='button' class='classImageButton classRemoveButton' onclick='showAddTeam(2); fillInfoToEdit("+id+");'><img src='images/edit_Normal.png'";
	code += " class='classEditImage' alt='editButton' title='Edita este equipo'></button>";
	code += "<div class='classShowTeamName'><span>"+nombre+"</span></div>";

	code += "<div class='btn-group classDropDownCorredores'><button type='button' class='btn btn-danger dropdown-toggle' data-toggle='dropdown'>";
	code += "CORREDORES <span class='caret'></span></button><ul class='dropdown-menu' role='menu'>";

	for (i = 0; i < maxCorredores; i++)
	{
		var auxTipo;

		if (corredores[i] === 0) auxTipo = "GREGARIO";
		else auxTipo = "JEFE DE FILAS";

		if (i < (maxCorredores-1)) 
		code += "<li class='classLI_Corredores'>"+auxTipo;
		else code += "<li class='classLI_Corredores' style='margin_bottom:10%;'>"+auxTipo;

		if (i < (maxCorredores-1)) code += "</li><li class='divider'>"; //Si se trata de la última iteración, prescinde de la barra separatoria
	}

	code += "</ul></div>";
	code += "<div class='classShowTeamColor' title='Color del equipo' style='background-color:"+getTeamColor(color)+"'></div>";

	return code;
}

function removeTeams (id)
{
	var divTeamX = getElementHTML("divAddTeam"+id);

	var auxContainerTeams = getElementHTML("divContainerEquipos");
	auxContainerTeams.removeChild(divTeamX); 

	arrayTeams.splice((id-1), 1);
	var count = arrayTeams.length;
	count++;

	var i;

	for (i = id; i < count; i++)
	{
		divTeamX = getElementHTML("divAddTeam"+(i+1));
		divTeamX.id = "divAddTeam"+i;
		divTeamX.innerHTML = getInnerTeamCode(i);
	}

	checkCountTeams();
}

/*
function addNewTeam ()
{
	var arrayCorredores = new Array();
	var nombreTeam = getElementHTML("InputTeamName").value;
	var auxContainerCorredores = getElementHTML("divContainerCorredores");
	
	var i;
	var count = auxContainerCorredores.getElementsByTagName("div").length;
	count++;

	for (i = 1; i < count; i++)
	{
		var innerDiv = getElementHTML("divAddCorredores"+i);
		var selectTipo = innerDiv.getElementsByTagName("select")[0];
		var sel = selectTipo.selectedIndex;

		arrayCorredores.push(sel);
	}

    var auxTeam = 
    {
    	id: arrayTeams.length+1,
        nombre: nombreTeam,
        corredores: arrayCorredores,
        color: color
    };

	arrayTeams.push(auxTeam);

	getElementHTML("articleAddTeams").style.display = 'none';
	getElementHTML("articleIndexTeams").style.display = 'block';

	appendTeam();
}


function updateTeams (id)
{
	var arrayCorredores = new Array();
	var nombreTeam = getElementHTML("InputTeamName").value;
	var auxContainerCorredores = getElementHTML("divContainerCorredores");
	
	var i;
	var count = auxContainerCorredores.getElementsByTagName("div").length;
	count++;

	for (i = 1; i < count; i++)
	{
		var innerDiv = getElementHTML("divAddCorredores"+i);
		var selectTipo = innerDiv.getElementsByTagName("select")[0];
		var sel = selectTipo.selectedIndex;

		arrayCorredores.push(sel);
	}

	getInnerTeamCode

	var nombre = arrayTeams[id-1].nombre;
	var color = arrayTeams[id-1].color;
	var corredores = arrayTeams[id-1].corredores;
	var i;
	var maxCorredores = corredores.length;
}*/

function checkCountTeams ()
{
	var totalTeams = arrayTeams.length;

	if (totalTeams >= 2) getElementHTML("buttonPlay").disabled = false;
	else getElementHTML("buttonPlay").disabled = true;
}

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
