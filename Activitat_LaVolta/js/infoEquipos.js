var db;
var arrayTeams;
var pruebaName;
var auxPartidaName;

function setArrayTeams (aux, n)
{
	arrayTeams = aux;
	pruebaName = n;
}

function indexedDBOk() 
{
	return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() 
{
    //No support? Go in the corner and pout.
    if(!indexedDBOk) return;

    var openRequest = indexedDB.open("Partidas",3);

    openRequest.onupgradeneeded = function(e) 
    {
            var thisDB = e.target.result;
            var i = 1;
            var createdTeam = false;

            	if(!thisDB.objectStoreNames.contains("team2")) 
	            {
                    thisDB.createObjectStore("team2",{keyPath: 'partida', autoIncrement:true}, false);
                    //createdTeam = true;
	            }

           /* while (i <= 5 && !createdTeam)
            {   
            	auxPartidaName = "team"+i;

	            if(!thisDB.objectStoreNames.contains(auxPartidaName)) 
	            {
                    thisDB.createObjectStore(auxPartidaName);
                    createdTeam = true;
	            }
	            else i++;
            }*/
    }

    openRequest.onsuccess = function(e) 
    {
        db = e.target.result;

        //Listen for add clicks
        document.querySelector("#saveTeams").addEventListener("click", addTeam, false);
    }        

    openRequest.onerror = function(e) 
    {
            //Do something for the error
    }

},false);


function addTeam(e) 
{
    var transaction = db.transaction(["team2"],"readwrite");
    var store = transaction.objectStore("team2");

    //Perform the add
    var request = store.add(arrayTeams);

    request.onerror = function(e) 
    {
    	console.log("Error",e.target.error.name);
            //some type of error handler
    }

    request.onsuccess = function(e) 
    {
    	console.log("Woot! Did it");
    }
}