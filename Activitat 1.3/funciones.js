function primera()
{
	console.clear();
	console.log("Empieza la ejecución de la primera()");
	console.log("Llamo a segunda() desde principal()");
	segunda();
	console.log("Acabo de llamar a segunda desde principal()");

	console.log("Llamo a tercera() desde principal()");
	tercera();
	console.log("Acabo de llamar a tercera() desde principal()");

	console.log("Acaba la ejecución de la primera()");
}

function primeraCallBack()
{
	console.clear();
	var auxFn = "";

	console.log("Empieza la ejecución de la primeraCallBack()");

	callBackFN(function(num)
	{
		if (num == 1) 
		{
			auxFn = "segunda";
			console.log("Llamo a "+auxFn+"() desde principal()");
			segunda();
		}
		else
		{
			auxFn = "tercera"; 
			console.log("Llamo a "+auxFn+"() desde principal()");
			tercera();
		}
	});

	console.log("Acabo de llamar a "+auxFn+"() desde principal()");

	console.log("Acaba la ejecución de la primeraCallBack()");
}

function callBackFN(callback)
{
	var aleat = Math.ceil(Math.random()*(0-2) + 2);

	callback(aleat);
}

function primeraAsync()
{
	console.clear();
	console.log("Empieza la ejecución de la primeraAsync()");

	segundaAsync();

	console.log("Acabo de llamar a segundaAsync() desde principal()");

	console.log("Acaba la ejecución de la primeraAsync()");
}

function segundaAsync()
{
	var i;
	var cont = 0;

	console.log("Empieza la ejecución de la segundaAsync()");
	console.log("Preparo el llançament de quarta()");

	 setTimeout(function()
	 {
        cuarta();
     }, 5000);


	console.log("Acaba la ejecución de la segundaAsync()");
}

function segunda()
{
	var i;
	var cont = 0;

	console.log("Empieza la ejecución de la segunda()");
	console.log("Entro al bucle llarg()");
	for (i = 0; i < 1200000000; i++)
	{
		cont++;
	}
	console.log("Surto del bucle llarg()");
	console.log("Acaba la ejecución de la segunda()");
}

function tercera()
{
	var i;
	var cont = 0;

	console.log("Empieza la ejecución de tercera()");
	console.log("Entro al bucle llarg()");
	for (i = 0; i < 1200000000; i++)
	{
		cont++;
	}
	console.log("Surto del bucle llarg()");
	console.log("Acaba la ejecución de la tercera()");
}

function cuarta()
{
	console.log("Empieza la ejecución de cuarta()");
	alert("Se muestra el alert");
	console.log("Acaba la ejecución de cuarta()");
}