
var comportamientoFN = function ()
{
	this.calculateGuerrero = function ()
	{
		var extra = 100+this.nvFuerza;

		this.attack = ((this.nvFuerza*this.nvMagia)/this.nvIntel) + extra;
	};

	this.calculateMago = function ()
	{
		var extra = 100+this.nvMagia;

		this.attack = ((this.nvFuerza*this.nvMagia)/this.nvIntel) + extra;
	};
}