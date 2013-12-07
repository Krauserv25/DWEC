
var totalCorredoresInTeamRegister;
var editID;
var arrayTeams;
var color;
var mode;
var currentRadioLoad;

function init ()
{
	getElementHTML("buttonPlay").disabled = true;
	getElementHTML("buttonAddTeam").disabled = true;

	getElementHTML("buttonEditTeam").style.display = 'none';

	totalCorredoresInTeamRegister = 0;
	editID = 1;
	color = 1;
	mode = 1;
	currentRadioLoad = 0;
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
				mode = 1;
				getElementHTML("buttonAddTeam").style.display = 'inline-block';
				getElementHTML("buttonEditTeam").style.display = 'none';
			}
			else
			{
				mode = 2;
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
		appendCorredores(corredores[i].rol);	
	}

	var auxColor = arrayTeams[id-1].color;
	getElementHTML("imageColor").src = "images/snail"+getTeamColor(auxColor)+".png";
	color = auxColor;
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

function setSpeedModal ()
{
	var i;
	var auxRol;
	var corredores;
	var maxCorredores;
	var code = "";
	var imageSrc;

	getElementHTML("buttonAsignarModal").disabled = true;
	getElementHTML("spanSpeedPoints").innerHTML = "1000";

	corredores = getCorredoresOfRegister();
	maxCorredores = corredores.length;

	for (i = 0; i < maxCorredores; i++)
	{
		if (corredores[i].rol === 0) 
		{
			auxRol = "GREGARIO";
			imageSrc = "images/snail"+getTeamColor(color)+".png";
		}
		else 
		{
			auxRol = "JEFE DE FILAS";
			imageSrc = "images/snailBoss"+getTeamColor(color)+".png";
		}

		code += "<div class='classSpeedRol'>"+auxRol+": </div><img src="+imageSrc+" class='classImageButton classModalSnailImages'></img>";
		code += "<button type='button' id="+("L_Arrow"+(i+1))+" class='classImageButton class_L_ArrowButton' onclick='changeSpeedValue(1, "+(i+1)+");'>";
		code += "<img src='images/L_ArrowNormal.png' class='class_L_ArrowImage' alt='arrow' title='Decrementa 100 puntos'></button>";

		code += "<input type='text' id="+("inputSpeedCorredor"+(i+1))+" class='classInputModalSpeed' value='0' disabled/>";
		
		code += "<button type='button' id="+("R_Arrow"+(i+1))+" class='classImageButton class_R_ArrowButton' onclick='changeSpeedValue(2, "+(i+1)+");'>";
		code += "<img src='images/R_ArrowNormal.png' class='class_R_ArrowImage' alt='arrow' title='Incrementa 100 puntos'></button>";

		code += " <strong>PUNTOS</strong><br /><br />";
	}
	
	getElementHTML("divContainerModalSpeed").innerHTML = code;
}

function getCorredoresOfRegister ()
{
	var arrayCorredores = new Array();
	var auxContainerCorredores = getElementHTML("divContainerCorredores");
	
	var i;
	var count = auxContainerCorredores.getElementsByTagName("div").length;

	for (i = 1; i <= count; i++)
	{
		var innerDiv = getElementHTML("divAddCorredores"+i);
		var selectTipo = innerDiv.getElementsByTagName("select")[0];
		var sel = selectTipo.selectedIndex;

		var auxInfoCorredores =
		{
			rol: sel,
			metrosMaxPorTurno: 0,
			metrosAvanzados: 0,
			metrosAAvanzar: 0
		}

		arrayCorredores.push(auxInfoCorredores);
	}

	return arrayCorredores;
}

function changeSpeedValue (arrow, id)
{
	var total = parseInt(getElementHTML("spanSpeedPoints").innerHTML);

	var auxInputSpeed = getElementHTML("inputSpeedCorredor"+id);
	var currentSpeed = parseInt(auxInputSpeed.value);

	if (arrow === 1) //Left Arrow
	{
		if (currentSpeed != 0 && total < 1000) 
		{
			getElementHTML("inputSpeedCorredor"+id).value = currentSpeed - 100;
			total += 100;
			getElementHTML("spanSpeedPoints").innerHTML = total;
		}
	}
	else //Right Arrow
	{
		if (currentSpeed != 1000 && total > 0) 
		{
			getElementHTML("inputSpeedCorredor"+id).value = currentSpeed + 100;
			total -= 100;
			getElementHTML("spanSpeedPoints").innerHTML = total;
		}
	}

	if (total === 0) getElementHTML("buttonAsignarModal").disabled = false;
	else getElementHTML("buttonAsignarModal").disabled = true;
}

function asignarSpeed ()
{
	var auxId;
	var auxTeam = setTeamInfoOnArray();

	if (mode == 1)
	{		
    	arrayTeams.push(auxTeam);
		appendTeam(arrayTeams.length);
		auxId = arrayTeams.length; //Sé que es el último porque lo acabamos de "registrar"
	}
	else auxId = editID; 

	var corredores = auxTeam.corredores;
	var maxCorredores = corredores.length;

	var i;

	for (i = 0; i < maxCorredores; i++)
	{
		auxTeam.corredores[i].metrosMaxPorTurno = getElementHTML("inputSpeedCorredor"+(i+1)).value;
	}

	arrayTeams[auxId-1] = auxTeam;

	getElementHTML("divAddTeam"+auxId).innerHTML = getInnerTeamCode(auxId);

	$('#modalSpeedCorredores').modal('hide');
	getElementHTML("articleAddTeams").style.display = 'none';
	getElementHTML("articleIndexTeams").style.display = 'block';
}

function loadTeamsPartida (array)
{
	getElementHTML("divContainerEquipos").innerHTML = ""; //Vacíamos los equipos actuales
	var i;
	
	arrayTeams = array;
	var maxTeams = arrayTeams.length;

	for (i = 1; i <= maxTeams; i++)
	{
		appendTeam(i);
		getElementHTML("divAddTeam"+i).innerHTML = getInnerTeamCode(i);
	}
}

function setTeamInfoOnArray ()
{
	var nombreTeam = getElementHTML("InputTeamName").value;
		
	var auxTeam = 
    {
    	partida: "Partida0",
    	id: arrayTeams.length+1,
        nombre: nombreTeam,
        corredores: getCorredoresOfRegister(),
        color: color
    };

    return auxTeam;
}

function appendTeam (id)
{
	//var totalTeams = arrayTeams.length;

	if (id < 5)
	{
		var iDiv = document.createElement('div');
		iDiv.id = 'divAddTeam'+id;
		iDiv.className = 'classAddCorredores';

		iDiv.innerHTML = getInnerTeamCode(id);
		getElementHTML("divContainerEquipos").appendChild(iDiv);
	}

	checkCountTeams();
}

function getInnerTeamCode (id)
{
	var nombre = arrayTeams[id-1].nombre;
	var color = arrayTeams[id-1].color;
	var corredores = arrayTeams[id-1].corredores;
	var maxCorredores = corredores.length;

	var code = "<button type='button' class='classImageButton classRemoveButton' onclick='removeTeams("+id+");'><img src='images/removeButton_Normal.png'";
	code += " class='classRemoveImage' alt='removeButton' title='Elimina este equipo de la lista'></button>";

	code += "<button type='button' class='classImageButton classRemoveButton' onclick='showAddTeam(2); fillInfoToEdit("+id+");'><img src='images/edit_Normal.png'";
	code += " class='classEditImage' alt='editButton' title='Edita este equipo'></button>";
	code += "<div class='classShowTeamName'><span>"+nombre+"</span></div>";

	code += "<div class='btn-group classDropDownCorredores'><button type='button' class='btn btn-danger dropdown-toggle' data-toggle='dropdown'>";
	code += "CORREDORES <span class='caret'></span></button><ul class='dropdown-menu' role='menu'>";

	var i;

	for (i = 0; i < maxCorredores; i++)
	{
		var auxTipo;
		var auxMetrosPorTurno = corredores[i].metrosMaxPorTurno;

		if (corredores[i].rol === 0) auxTipo = "GREGARIO_"+auxMetrosPorTurno;
		else auxTipo = "JEFE FIL_"+auxMetrosPorTurno;

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

function checkCountTeams ()
{
	var totalTeams = arrayTeams.length;

	if (totalTeams >= 2) getElementHTML("buttonPlay").disabled = false;
	else getElementHTML("buttonPlay").disabled = true;
}

function setAllTeamsInfo ()
{
	var i;

	for (i = 0; i < arrayTeams.length; i++)
	{
		arrayTeams[i].partida = getElementHTML("inputGameName").value;
	}
	setArrayTeams(arrayTeams);

	$('#modalSaveGame').modal('hide');

	setTimeout(function ()
    {
		goToPage();
	}, 1000);
}

function goToPage() 
{
	location.href= "game.html?teams="+arrayTeams[0].partida;
} 