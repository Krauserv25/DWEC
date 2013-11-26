
var arrayTeams;
var intervalTime;
var disabledPasarTurno;

function init ()
{
	disabledPasarTurno = false;

	arrayTeams = new Array();

	var auxTeamA = 
    {
    	id: 1,
        nombre: "Los MCeros",
        corredores: getCorredores(0, 100, 1, 300, 0, 100, 1, 400, 0, 200),
        color: 6
    };
    arrayTeams.push(auxTeamA);

    var auxTeamB = 
    {
    	id: 2,
        nombre: "Los caracoles del averno",
        corredores: getCorredores(1, 500, 1, 300, 0, 100, 0, 100, 1, 400),
        color: 2
    };
    arrayTeams.push(auxTeamB);

    var auxTeamC = 
    {
    	id: 3,
        nombre: "Turbo Derrapes",
        corredores: getCorredores(0, 100, 0, 100, 0, 100, 1, 400, 1, 500),
        color: 3
    };
    arrayTeams.push(auxTeamC);

    var auxTeamD = 
    {
    	id: 4,
        nombre: "ojos saltones al poder",
        corredores: getCorredores(0, 200, 1, 400, 0, 200, 1, 300, 1, 400),
        color: 5
    };
    arrayTeams.push(auxTeamD);

    renderGame();
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
			nombre = nombre.replace(" ","&nbsp;");

			if (arrayTeams[i].corredores[j].rol === 0) auxImageSrc = "images/snail"+auxColor+".png";
			else auxImageSrc = "images/snailBoss"+auxColor+".png";

			code += "<div class="+auxClassPar+"><img src="+auxImageSrc+" id="+("snailInCurse"+(i+1)+"_"+(j+1))+" class='classSnailImage' alt='snail'>";
			code += "</div><img src='images/chess.jpeg' class='classImageGoal' alt='goal'>";

			code += "<div class='progress progress-striped active' style='float: left; margin-left:1%; margin-bottom:0; height: 4%;'>";
			code += "<div id="+("Progress"+(i+1)+"_"+(j+1))+" class='progress-bar progress-bar-danger' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%''>";
			code += "</div></div>";
		}
	}

	divContainerCarreras.innerHTML = code;
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
			else arrayTeams[i].corredores[j].metrosAvanzados = 100;
		}
	}

	if (disabledPasarTurno) 
	{
		getElementHTML("buttonPasarTurno").disabled = true;
		disabledPasarTurno = false;
	}
	else getElementHTML("buttonPasarTurno").disabled = false;
}