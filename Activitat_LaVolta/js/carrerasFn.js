
var arrayTeams;
var intervalTime;
var disabledPasarTurno;
var randomMessagesList;
var startGame;

function init ()
{
	disabledPasarTurno = false;
	startGame = true;

	var teamName = getTeamName();

	randomMessagesList = new Array();

	setTimeout(function ()
	{
		getCurrentPartida(teamName, function(obj)
			{
				arrayTeams = obj;

				renderGame();
				moveToNextPoint();
				startGame = false;
			});
	}, 3000);

    setRandomMessages(); 
}

function setRandomMessages()
{
	randomMessagesList.push("Soy el mejor ;)");
	randomMessagesList.push("Voy a ganar como sea");
	randomMessagesList.push("Nuestro equipo debe ser vencedor");
	randomMessagesList.push("Arriba TTTTTTTTTTTN"); //TTTTTTTTTTTN es el código que representa Team Name y va a sustituirse por el mismo
	randomMessagesList.push("Me llamo Hebensnail");
	randomMessagesList.push("Caracoles, Cu&aacute;nto caracol!");
	randomMessagesList.push("Mi abuelo fue corredor");
	randomMessagesList.push("CCCCCCCCCCCCC color winner"); //CC es el código que representa Code Color y va a sustituirse por el mismo
	randomMessagesList.push("Vamos equipo. Ui mira que caracola");
	randomMessagesList.push("Si pierdo el director me echa sal");
	randomMessagesList.push("No me traje las babas de recambio!");
	randomMessagesList.push("Mis ojitos enamoran al personal");
	randomMessagesList.push("Traigo sal en la concha");
	randomMessagesList.push("Concha lista para derrapar");
	randomMessagesList.push("Voy a llegar el primero");
	randomMessagesList.push("Voy a mirar fijamente mi objetivo");
	randomMessagesList.push("Guerra en la pista!");
	randomMessagesList.push("A quien se me cruce le golpeo");
	randomMessagesList.push("TTTTTTTTTTTN rules!");
	randomMessagesList.push("Me he clavado una piedra antes");
	randomMessagesList.push("My team is on fire.");
}

function setInfoBolsa (id)
{

	console.log("ID -> "+id);
}

function renderGame ()
{
	var totalTeams = arrayTeams.length;
	var divContainerCarreras = getElementHTML("divContainerCarreras");
	var code = "";
	var auxImageSrc;
	var auxColor;
	var par_impar = false;
	var nombre;
	var metrosRecorridos;
	var messageSpeak;

	var i;
	var j;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			var auxClassPar;

			if (!par_impar)
			{
				par_impar = true;
				auxClassPar = "classFieldsCarrerasImpar";
			} 
			else 
			{
				par_impar = false;
				auxClassPar = "classFieldsCarrerasPar";
			}

			auxColor = getTeamColor(arrayTeams[i].color);
			nombre = arrayTeams[i].nombre;
			var pattSpace = / /g;

			nombre = nombre.replace(pattSpace, "&nbsp;");

			metrosRecorridos = arrayTeams[i].corredores[j].metrosAvanzados;
			messageSpeak = randomMessagesList[Math.floor(Math.random()*(21)+0)]; //21 es el total de mensajes posibles
			messageSpeak = messageSpeak.replace(pattSpace, "&nbsp;");
			messageSpeak = messageSpeak.replace("TTTTTTTTTTTN", nombre);
			messageSpeak = messageSpeak.replace("CCCCCCCCCCCCC", auxColor);

			if (arrayTeams[i].corredores[j].rol === 0) auxImageSrc = "images/snail"+auxColor+".png";
			else auxImageSrc = "images/snailBoss"+auxColor+".png";

			code += "<div class="+auxClassPar+"><img src="+auxImageSrc+" onclick='setInfoBolsa(\""+(i+1)+"_"+(j+1)+"\");' id="+("snailInCurse"+(i+1)+"_"+(j+1))+" class='classSnailImage' alt='snail' rel='tooltip' title="+messageSpeak+" data-toggle='modal' data-target='#modalSpeedBolsaCorredores'>";
			code += "</div><img src='images/chess.jpeg' class='classImageGoal' alt='goal'>";

			code += "<div class='progress progress-striped active' style='float: left; margin-left:1%; margin-bottom:0; height: 4%; background-color:gray!important;'>";
			code += "<div id="+("Progress"+(i+1)+"_"+(j+1))+" class='progress-bar' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%; background-color:"+auxColor+"!important;'>";
			code += "<span id="+("spanMetrosAvanzados"+(i+1)+"_"+(j+1))+" class='classSpanProgress'>"+metrosRecorridos+"/1000</span></div></div>";
			code += "<img src='images/endFlag"+auxColor+".png' id="+("imagenWin"+(i+1)+"_"+(j+1))+" style='width:3%; height: 4%; margin-left:1%; float:left;' hidden></img>";
		}
	}

	code += "<button type='button' id='buttonPasarTurno' class='btn btn-danger' onclick='updateCorredores();''><img src='images/go.png' alt='go'>PASAR TURNO</button>";
	divContainerCarreras.innerHTML = code;

    $(function () {
        $('.classSnailImage').tooltip();
    });
}

function getCorredores (rA, mA, rB, mB, rC, mC, rD, mD, rE, mE)
{
	var arrayCorredores = new Array();

	arrayCorredores.push(getauxInfoCorredor(rA, mA));
	arrayCorredores.push(getauxInfoCorredor(rB, mB));
	arrayCorredores.push(getauxInfoCorredor(rC, mC));
	arrayCorredores.push(getauxInfoCorredor(rD, mD));
	arrayCorredores.push(getauxInfoCorredor(rE, mE));

	return arrayCorredores;
}

function getauxInfoCorredor (r, m)
{
	var auxInfoCorredores =
	{
		rol: r,
		metrosMaxPorTurno: m,
		metrosAvanzados: 0,
		metrosAAvanzar: 0
	}

	return auxInfoCorredores;
}

function updateCorredores ()
{
	var i;
	var j;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			arrayTeams[i].corredores[j].metrosAAvanzar += Math.floor((Math.random()*(arrayTeams[i].corredores[j].metrosMaxPorTurno/100))+1);
		}
	}

	clearInterval(intervalTime);
	intervalTime = setInterval(moveToNextPoint, 300);
	setArrayTeams(arrayTeams); //Al mismo momento actualiza la partida
}

function moveToNextPoint ()
{
	var i;
	var j;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			if (arrayTeams[i].corredores[j].metrosAvanzados < 100)
			{
				if (arrayTeams[i].corredores[j].metrosAvanzados < arrayTeams[i].corredores[j].metrosAAvanzar)
				{
					disabledPasarTurno = true;
					var snailInCurse = getElementHTML("snailInCurse"+(i+1)+"_"+(j+1));
					var progress = getElementHTML("Progress"+(i+1)+"_"+(j+1));
					arrayTeams[i].corredores[j].metrosAvanzados++;
					snailInCurse.style.marginLeft = arrayTeams[i].corredores[j].metrosAvanzados+'%';
					progress.style.width = arrayTeams[i].corredores[j].metrosAvanzados+'%';
				}
				else arrayTeams[i].corredores[j].metrosAvanzados = arrayTeams[i].corredores[j].metrosAAvanzar;
			}
			else 
			{
				arrayTeams[i].corredores[j].metrosAvanzados = 100;
				checkWinnerTeam();
				getElementHTML("imagenWin"+(i+1)+"_"+(j+1)).style.display = 'block';
			}

			getElementHTML("spanMetrosAvanzados"+(i+1)+"_"+(j+1)).innerHTML = (arrayTeams[i].corredores[j].metrosAvanzados*10)+"/1000";
		}
	}

	if (disabledPasarTurno && !startGame) 
	{
		getElementHTML("buttonPasarTurno").disabled = true;
		disabledPasarTurno = false;
	}
	else getElementHTML("buttonPasarTurno").disabled = false;
}

function checkWinnerTeam ()
{
	var i;
	var j;
	var allTeamWin = true;

	var totalTeams = arrayTeams.length;

	for (i = 0; i < totalTeams; i++)
	{
		var totalCorredores = arrayTeams[i].corredores.length;

		for (j = 0; j < totalCorredores; j++)
		{
			if (arrayTeams[i].corredores[j].metrosAvanzados < 100)
			{
				allTeamWin = false;
			}
		}

		if (allTeamWin)
		{
			location.href= "winScreen.html?team="+arrayTeams[i].nombre+"&color="+getTeamColor(arrayTeams[i].color);
		}

		allTeamWin = true;
	}
}