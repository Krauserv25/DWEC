var persona = function(nvEnergia, estado)
{
	this.nivelEnergia = nvEnergia;
	this.estado = estado;

	this.opinion = function()
	{
		if (this.estado && this.nivelEnergia > 1000)
		{
			console.log("Soy el más fuerte del mundo");
		}
		
		if (!(this.estado) && this.nivelEnergia < 2000)
		{
			console.log("La vida es una mierda");
		} 
	};
}

var paco = new persona(1100, true);
paco.opinion();

var pedro = new persona(1100, false);
pedro.opinion();