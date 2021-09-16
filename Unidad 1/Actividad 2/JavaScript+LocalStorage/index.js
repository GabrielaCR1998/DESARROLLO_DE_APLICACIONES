function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre_Cli = document.getElementById("Input2").value;
    var titulo = document.getElementById("Input3").value;
    var correo = document.getElementById("Input4").value;
    var Tiempo = document.getElementById("Input5").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Libro = {
            id, //Folio:id    id:id
            nombre_Cli, //nombre:nombre
            titulo,
            correo,
            Tiempo
        }

        var lista_Libros=JSON.parse(localStorage.getItem("Libros"));

        if(lista_Libros==null)
        { 
            var lista_Libros = [];
        }
        
        const existe = lista_Libros.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_Libros=lista_Libros.filter(Libro=>Libro.id!=id);

            }
                
            lista_Libros.push(Libro);
            var temporal = lista_Libros.sort((a,b) => a.id-b.id);
            localStorage.setItem("Libros", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de Libro","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_Libros = JSON.parse(localStorage.getItem("Libros"));
    
     
    if(lista_Libros)
    {
        lista_Libros.forEach((Libro)=>printRow(Libro));
    }
}


function printRow(Libro){
    
    if(Libro!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Libro.id;
        cell2.innerHTML = Libro.nombre_Cli; 
        cell3.innerHTML = Libro.titulo;
        cell4.innerHTML = Libro.correo;
        cell5.innerHTML = Libro.Tiempo; 
        cell6.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Libro.id})">Eliminar</button>`;
        cell7.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Libro.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_Libros = JSON.parse(localStorage.getItem("Libros"));
    var temporal=lista_Libros.filter(Libro=>Libro.id!=id);
    localStorage.setItem("Libros", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Libros");
    }
  
    read();
    
}

function seekR(id){

    const lista_Libros = JSON.parse(localStorage.getItem("Libros"));
    var Libro=lista_Libros.filter(Libro=>Libro.id==id);
    //console.log(Libro[0]);
    updateR(Libro[0]);
}

function updateR(Libro){
    if(Libro!=null)
    {
        document.getElementById("Input1").value=Libro.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Libro.nombre_Cli;
        document.getElementById("Input3").value=Libro.titulo;
        document.getElementById("Input4").value=Libro.correo;
        document.getElementById("Input5").value=Libro.Tiempo;
    }
}


//Para consulta de folio
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_Libros = JSON.parse(localStorage.getItem("Libros"));
    var LibrosC=lista_Libros.filter(Libro=>Libro.Tiempo==c);
    if(LibrosC)
    {
        LibrosC.forEach((Libro)=>printRowQ(Libro));
    }
    //console.log(LibrosC)

}


function printRowQ(Libro){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Libro.id;
    cell2.innerHTML = Libro.nombre_Cli; 
    cell3.innerHTML = Libro.titulo;
    cell4.innerHTML = Libro.correo;
    cell5.innerHTML = Libro.Tiempo; 
   
}