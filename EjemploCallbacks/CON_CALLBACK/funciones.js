//Clase opiniones que sirve para definir la opinión (tantos como se quieran) de varios tipos de personas. 
//Su comportamiento se ve declarado aquí
var opiniones = function()
{
	//Función que muestra un mensaje  en caso de que sea optimista
	this.opinionOptimista = function ()
	{
		if (this.nivelEnergia > 1000)
		{
			console.log("Soy el más fuerte del mundo");
		}		
	};

	//Función que muestra un mensaje  en caso de que sea pesimista
	this.opinionPesimista = function ()
	{
		if (this.nivelEnergia < 2000)
		{
			console.log("La vida es una mierda");
		} 		
	};

	//Función que muestra un mensaje  en caso de que sea equilibrado
	this.opinionEquilibrada = function ()
	{
		alert("soy equilibrada"); //En este caso se usa un alert para comprobar que existen varias formas de comportamiento
	};
}

//Clase persona que no va a modificarse para cada opinión ya que le pasamos la función para que se comporte de una forma en concreto
//el parámetro estado recoge la función de comportamiento para asignarla a una variable
var persona = function(nvEnergia, estado)
{
	this.nivelEnergia = nvEnergia;
	this.estado = estado; //Atributo que recibe la función de comportamiento (Solo la asigna. NO se ejecuta)

	this.opinion = function()
	{
		this.estado(); //Cuando se llama el método opinion ejecutamos la función de comportamiento para esa persona
	};
}

//Imprescindible instanciar un objeto de la clase opiniones para poder acceder a sus métodos
var opiniones = new opiniones();

//Declaramos distintas personas pasándole diferentes posiblidades de nivel de energía y comportamiento
// y seguidamente se ejecuta el método opinion
var paco = new persona(1100, opiniones.opinionOptimista);
paco.opinion();

var pedro = new persona(1100, opiniones.opinionPesimista);
pedro.opinion();

var alicia = new persona(1500, opiniones.opinionEquilibrada);
alicia.opinion();