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

    var openRequest = indexedDB.open("saveExamen",1);

    openRequest.onupgradeneeded = function(e) 
    {
        var thisDB = e.target.result;

    	if(!thisDB.objectStoreNames.contains("numerosExamen")) 
        {
            thisDB.createObjectStore("numerosExamen",{autoIncrement:true}, false);
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

//Función que almacena un número pasado a la BD de IndexDB
function saveNumIndexDB (num)
{
    var transaction = db.transaction(["numerosExamen"],"readwrite");
    var store = transaction.objectStore("numerosExamen");

    store.openCursor().onsuccess = function(event) 
    {
        store.add(num);
    }
}