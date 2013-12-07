var db;
var arrayTeams;

function setArrayTeams (aux)
{
	arrayTeams = aux;
    savePartida();
}

function indexedDBOk() 
{
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() 
{
    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;

    var openRequest = indexedDB.open("PartidasJuego",4);

    openRequest.onupgradeneeded = function(e) 
    {
        var thisDB = e.target.result;
        var i = 1;
        var createdTeam = false;

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