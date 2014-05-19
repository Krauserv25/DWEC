/*
	DESCRIPCION: SCRIPT QUE TRATA LAS FUNCIONES O MÉTODOS ÚTILES ASÍ COMO CÁLCULOS O PROCESOS SECUNDARIOS
	AUTOR: IVAN VALERA
*/

var utils = 
{
	//Métodos que sirven para debugar y facilitar el seguimiento del proceso al programador
	alert: function(show)
	{
		//Paso 1: Mostrar los datos para debugar
		if (config.debug)
		{
			alert(show);
		}
	},
	log: function(show)
	{
		//Paso 1: Mostrar los datos para debugar
		if (config.debug)
		{
			console.log(show);
		}		
	}
};