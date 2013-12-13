var db;
var arrayTeams;

//Función que recoge al información de los equipos de una partida para ser almacenados en la BD
function setArrayTeams (aux)
{
	arrayTeams = aux;
    savePartida();
}

//Función que indica si existe el indexDB en la ventana
function indexedDBOk() 
{
	return "indexedDB" in window;
}

//Función que inicializa el DOM e intenta crear una BD con una tabla específica
document.addEventListener("DOMContentLoaded", function() 
{
    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;

    var openRequest = indexedDB.open("saveGame",1);

    openRequest.onupgradeneeded = function(e) 
    {
        var thisDB = e.target.result;

    	if(!thisDB.objectStoreNames.contains("partidas")) 
        {
            thisDB.createObjectStore("partidas",{keyPath: 'partida', autoIncrement:true}, false);
        }
    }

    openRequest.onsuccess = function(e) 
    {
        db = e.target.result;
    }        

    openRequest.onerror = function(e) 
    {
            //Do something for the error
    }

},false);

//Función que genera o modifica los datos de una partida en la BD
//Si el nombre de la partida no existe se creará añadirá una nueva partida. En caso contrario, se modificará la misma
function savePartida ()
{
    var cont = 0;
    var dateInfo = new Date();
    var auxDate = dateInfo.getDate() + "/" + (dateInfo.getMonth() +1) + "/" + dateInfo.getFullYear();
    auxDate += "&nbsp;&nbsp;&nbsp;&nbsp;" + dateInfo.getHours() + ":" + dateInfo.getMinutes() + ":" + dateInfo.getSeconds();

    var auxInfo =
    {
        Equipos: arrayTeams,
        fecha: auxDate
    }

    var foundPartida = false;

    var transaction = db.transaction(["partidas"],"readwrite");
    var store = transaction.objectStore("partidas");

    store.openCursor().onsuccess = function(event) 
    {
        var cursor = event.target.result;

        if(cursor && !foundPartida) 
        {
            var auxNombrePartida = cursor.value.Equipos[0].partida;

            if (auxInfo.Equipos[0].partida === auxNombrePartida)
            {
                foundPartida = true;

                cursor.value.Equipos = auxInfo.Equipos;
                cursor.value.fecha = auxInfo.fecha;
                cursor.update(cursor.value);
            }
            
            cursor.continue();
        }
        else
        if (!foundPartida)
        {
            store.add(auxInfo);
        }
    }
}

//Función que devuelve los datos de una partida en concreto para ser cargada en la web
function getPartida() 
{
    var foundPartida = false;
    var name = $("#divContainerModalLoadGame input[name$='radioLoad']:checked + span").text();

    var objectStore = db.transaction('partidas').objectStore('partidas');

      objectStore.openCursor().onsuccess = function(event) 
      {
          var cursor = event.target.result;

          if(cursor && !foundPartida) 
          {     
            var auxNombrePartida = cursor.value.Equipos[0].partida;

            if (name === auxNombrePartida)
            {              
                foundPartida = true;
                auxObject = cursor.value.Equipos;

                loadTeamsPartida(auxObject);
                $('#modalLoadGame').modal('hide');
            }

            cursor.continue();
         }
    }
}

//Función que recoge la información de todas las partidas disponibles en la BD y las muestra para poder ser cargadas
function getAllPartidas ()
{
    var code = "";

    var firstCode = false;
    var contRadioButtons = 1;

    var objectStore = db.transaction('partidas').objectStore('partidas');
      objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;

      if(cursor) 
      {
        
        var auxNombrePartida = cursor.value.Equipos[0].partida;

        if (!firstCode)
        {
            code += "<input type='radio' id="+("radioLoad"+contRadioButtons)+" name='radioLoad' value="+contRadioButtons+" checked='checked'/><span>"+auxNombrePartida+"</span>";
            firstCode = true;
        }
        else code += "<input type='radio' id="+("radioLoad"+contRadioButtons)+" name='radioLoad' value="+contRadioButtons+" /><span>"+auxNombrePartida+"</span>";

        
        code += "<span>"+cursor.value.fecha+"</span><br />";
        
        getElementHTML("divContainerModalLoadGame").innerHTML = code;
        cursor.continue();
        contRadioButtons++;
     }
  }
}

//Función que recoge los datos de una partida en concreto con el fin de representarlos en el juego
function getCurrentPartida (name, callBack)
{
    var auxObject;
    var foundPartida = false;

    var objectStore = db.transaction('partidas').objectStore('partidas');

      objectStore.openCursor().onsuccess = function(event) 
      {
          var cursor = event.target.result;

          if(cursor && !foundPartida) 
          {     
            var auxNombrePartida = cursor.value.Equipos[0].partida;

            if (name === auxNombrePartida)
            {     
                foundPartida = true;
                auxObject = cursor.value.Equipos;
            }

            cursor.continue();
         }
         else
         {
            callBack(auxObject);
         }
    }
}