

var persona = function (name, age)
{
	this.name = name;
	this.age = age;
}

function handleFileSelect(evt) 
{
	var fileJSON;

	var files = document.getElementById('fileJSON').files;

	if (!files.length) 
	{
	  alert('Debes seleccionar un archivo .json');
	  return;
	}
	else
	{
		var fileJSON = files[0];

		if (!fileJSON.type.match('json.*'))
		{
			alert('Debes seleccionar un archivo .json');
			return;
		}
	}
	      
	var start = parseInt(0);
	var stop = parseInt(fileJSON.size - 1);

	var reader = new FileReader();

	// If we use onloadend, we need to check the readyState.
	reader.onloadend = function(evt) 
	{
	  if (evt.target.readyState == FileReader.DONE) 
	  {
	  	var auxPartida = evt.target.result;
	  	console.log(JSON.parse(auxPartida));
	  }
	};

	var blob = fileJSON.slice(start, stop + 1);
	reader.readAsBinaryString(blob);
}

function hablar ()
{
	switch ($('#iframe').val())
	{
		case 'Charizard lanzallamas':
			$('#resultAudio').val("Charizard usó lanzallamas");
		break;
	}
}

//console.log(jsonPersona);

function init ()
{
	  /*$('#files').change(function()
  	{
  		alert("golaaa");
  	});*/
	  document.getElementById('fileJSON').addEventListener('change', handleFileSelect, false);

	var prueba = new  persona("JODER", 18);
	var jsonPersona = JSON.stringify(prueba);

	var data = "text/json;charset=utf-8," + encodeURIComponent(jsonPersona);
	var code = "";
		//code += '<a href="data:'+data+'" download="data.json">DOWNLOAD JSON</a>';
		//

	code += '<a href="archivoPrueba.txt" download="archivoPrueba.txt">DOWNLOAD JSON</a>';

	$("body").append(code);
}

$(document).on("click", "a.fileDownloadPromise", function () {
    $.fileDownload($(this).prop('href'))
        .done(function () { alert('File download a success!'); })
        .fail(function () { alert('File download failed!'); });
 
    return false; //this is critical to stop the click event which will trigger a normal file download
});

function loadJSON ()
{
	//readTextFile("http://../data.json");

    //after button is clicked we download the data

        //start ajax request
        $.ajax({
            url: "data.json",
            //force to handle it as text
            dataType: "text",
            success: function(data) {
                
                //data downloaded so we call parseJSON function 
                //and pass downloaded data
                var json = $.parseJSON(data);
                //now json variable contains data in json format
                //let's display a few items
                //$('#results').html('Plugin name: ' + json.name + '<br />Author: ' + json.author.name);
            }
        });


	/*var txtURL = "data.json";
	var url = txtURL.replace("/","\\");
	$.ajax({
	url: url,
	success: function (data) {
	  var obj = JSON.parse(data);
	  console.log(obj);
	}
	});*/
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function prueba ()
{
	$.getJSON('../data.json', function(data) 
	{         
    	alert(data);
	});
}

function readfile() {
	console.log(document.getElementById('iframe').contentDocument.body.firstChild.innerHTML);
}

function readMyJSON()
{
	var aux = $('pre').text();
	alert(aux);
}