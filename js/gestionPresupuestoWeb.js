import * as gestionPresupuesto from "./gestionPresupuesto.js";


function mostrarDatoEnId (idElemento, valor) {

    let elemento = document.getElementById(idElemento);

    elemento.textContent = valor;

}

function mostrarGastoWeb (idElemento, gasto) {

    let elemento = document.getElementById(idElemento);


    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.className = "gasto-descripcion";
    let parrafoGastoDescripcion = document.createElement("p");
    parrafoGastoDescripcion.textContent = gasto.descripcion;
    divGastoDescripcion.append(parrafoGastoDescripcion);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.className = "gasto-fecha";
    let parrafoGastoFecha = document.createElement("p");
    parrafoGastoFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGastoFecha.append(parrafoGastoFecha);


    let divGastoValor = document.createElement("div");
    divGastoValor.className = "gasto-valor";
    let parrafoGastoValor = document.createElement("p");
    parrafoGastoValor.textContent = gasto.valor;
    divGastoValor.append(parrafoGastoValor);


    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);


    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.className = "gasto-etiquetas";


   for (let etiqueta of gasto.etiquetas) {

    let spanGastoEtiquetas = document.createElement("span");
    spanGastoEtiquetas.className = "gasto-etiquetas-etiqueta";

    spanGastoEtiquetas.textContent = etiqueta;

    let nuevoBorrarEtiquetasHandle = new BorrarEtiquetasHandle();
    nuevoBorrarEtiquetasHandle.gasto = gasto;
    nuevoBorrarEtiquetasHandle.etiqueta = etiqueta;

    spanGastoEtiquetas.addEventListener("click", nuevoBorrarEtiquetasHandle);

    divGastoEtiquetas.append(spanGastoEtiquetas);

    }

    divGasto.append(divGastoEtiquetas);


    let btnEditar = document.createElement("button");
    btnEditar.setAttribute("type", "button");
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";

    let nuevoEditarHandle = new EditarHandle();
    nuevoEditarHandle.gasto = gasto;

    btnEditar.addEventListener("click", nuevoEditarHandle);

    divGasto.append(btnEditar);


    let btnBorrar = document.createElement("button");
    btnBorrar.setAttribute("type", "borrar");
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";

    let nuevoBorrarHandle = new BorrarHandle();
    nuevoBorrarHandle.gasto = gasto;

    btnBorrar.addEventListener("click", nuevoBorrarHandle);

    divGasto.append(btnBorrar);

    let btnBorrarApi = document.createElement("button");
    btnBorrarApi.className = "gasto-borrar-api";
    btnBorrarApi.setAttribute("type", "button");
    btnBorrarApi.innerHTML = "Borrar (API)";

    let gastoBorrarApi = new BorrarGastoApi();
    gastoBorrarApi.gasto = gasto;

    btnBorrarApi.addEventListener("click", gastoBorrarApi);

    divGasto.append(btnBorrarApi);


    let btnEditarFormulario = document.createElement("button");
    btnEditarFormulario.setAttribute("type", "button");
    btnEditarFormulario.className = "gasto-editar-formulario";
    btnEditarFormulario.textContent = "Editar (formulario)";


    let nuevoEditarFormulario = new EditarHandleFormulario();

    nuevoEditarFormulario.gasto = gasto;

    btnEditarFormulario.addEventListener("click", nuevoEditarFormulario);

    divGasto.append(btnEditarFormulario);

    elemento.append(divGasto);


}


function BorrarGastoApi () {

    this.handleEvent = async function () {

        let nombreUsuario = document.getElementById("nombre_usuario").value;


        try {
        
        let respuesta = await fetch (`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`, 
         
        {
            method: "DELETE"
        });        

        if (respuesta.ok) {

            cargarGastosApi();
        }
        else {
            throw new Error ("Fallo al borrar el gasto");
        }
    } catch (error) {

        alert("Error: " + error.message);
    }

    }
}



function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {


    // Obtener la capa donde se muestran los datos agrupados por el período indicado.
    // Seguramente este código lo tengas ya hecho pero el nombre de la variable sea otro.
    // Puedes reutilizarlo, por supuesto. Si lo haces, recuerda cambiar también el nombre de la variable en el siguiente bloque de código

    var divP = document.getElementById(idElemento);

    // Borrar el contenido de la capa para que no se duplique el contenido al repintar

    divP.innerHTML = "";


    let elemento = document.getElementById(idElemento);


    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    let h1GastosAgrupados = document.createElement("h1");
    h1GastosAgrupados.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1GastosAgrupados);


    for (let [clave, valor] of Object.entries(agrup)) {


        let agrupacionDato = document.createElement("div");
        agrupacionDato.className = "agrupacion-dato";

        let agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.className = "agrupacion-dato-clave";
        agrupacionDatoClave.textContent = clave;
        agrupacionDato.append(agrupacionDatoClave);


        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.className = "agrupacion-dato-valor";
        agrupacionDatoValor.textContent = valor;
        agrupacionDato.append(agrupacionDatoValor);

        divAgrupacion.append(agrupacionDato);

    }

    elemento.append(divAgrupacion);

                // Estilos
            divP.style.width = "33%";
            divP.style.display = "inline-block";
            // Crear elemento <canvas> necesario para crear la gráfica
            // https://www.chartjs.org/docs/latest/getting-started/
            let chart = document.createElement("canvas");
            // Variable para indicar a la gráfica el período temporal del eje X
            // En función de la variable "periodo" se creará la variable "unit" (anyo -> year; mes -> month; dia -> day)
            let unit = "";
            switch (periodo) {
            case "anyo":
                unit = "year";
                break;
            case "mes":
                unit = "month";
                break;
            case "dia":
            default:
                unit = "day";
                break;
            }

        // Creación de la gráfica
        // La función "Chart" está disponible porque hemos incluido las etiquetas <script> correspondientes en el fichero HTML
        const myChart = new Chart(chart.getContext("2d"), {
            // Tipo de gráfica: barras. Puedes cambiar el tipo si quieres hacer pruebas: https://www.chartjs.org/docs/latest/charts/line.html
            type: 'bar',
            data: {
                datasets: [
                    {
                        // Título de la gráfica
                        label: `Gastos por ${periodo}`,
                        // Color de fondo
                        backgroundColor: "#555555",
                        // Datos de la gráfica
                        // "agrup" contiene los datos a representar. Es uno de los parámetros de la función "mostrarGastosAgrupadosWeb".
                        data: agrup
                    }
                ],
            },
            options: {
                scales: {
                    x: {
                        // El eje X es de tipo temporal
                        type: 'time',
                        time: {
                            // Indicamos la unidad correspondiente en función de si utilizamos días, meses o años
                            unit: unit
                        }
                    },
                    y: {
                        // Para que el eje Y empieza en 0
                        beginAtZero: true
                    }
                }
            }
        });
        // Añadimos la gráfica a la capa
        divP.append(chart);

    }


    function repintar() {

        mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

        mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());

        mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

        let divListadoGastosCompleto = document.getElementById("listado-gastos-completo");
        divListadoGastosCompleto.innerHTML = "";

        let gastos = gestionPresupuesto.listarGastos();


        for (let gasto of gastos) {
            mostrarGastoWeb("listado-gastos-completo", gasto);
        }


        let agruparPorDia = gestionPresupuesto.agruparGastos("dia");
        
        let agruparPorMes = gestionPresupuesto.agruparGastos("mes");
        
        let agruparPorAnyo = gestionPresupuesto.agruparGastos("anyo");      
        
        
        
        for (let [clave, valor] of Object.entries(agruparPorDia)) {
            mostrarGastosAgrupadosWeb("agrupacion-dia", { [clave]: valor }, "día");
        }
        
        for (let [clave, valor] of Object.entries(agruparPorMes)) {
            mostrarGastosAgrupadosWeb("agrupacion-mes", { [clave]: valor }, "mes");
        }
        
        for (let [clave, valor] of Object.entries(agruparPorAnyo)) {
            mostrarGastosAgrupadosWeb("agrupacion-anyo", { [clave]: valor }, "año");
        }
    }


    function actualizarPresupuestoWeb () {

        let introducePresupuesto = prompt("Por favor, introduce un presupuesto");

        let cambiarANumero = Number(introducePresupuesto);

        if (cambiarANumero > 0 && isFinite(cambiarANumero)) {
            gestionPresupuesto.actualizarPresupuesto(cambiarANumero);
        }
        else {
            alert("Introduzca un presupuesto válido");
        }

        repintar();
    }


    let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");

    btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);



    function nuevoGastoWeb () {

        let descripcion = prompt("Introduzca una descripción del gasto");

        let valor = prompt("Introduzca el valor");

        let fecha = prompt("Introduzca la fecha en formato yyyy-mm-dd");

        let etiquetas = prompt("Introduzca las etiquetas separadas por comas");

        let valorANumero = Number(valor);

        let arrayEtiquetas = etiquetas.split(",");

        let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valorANumero, fecha, ...arrayEtiquetas);

        gestionPresupuesto.anyadirGasto(nuevoGasto);

        repintar();

        console.log(nuevoGasto.id);
    }


    let btnAnyadirGasto = document.getElementById("anyadirgasto");

    btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);



    function EditarHandle () {

            this.handleEvent = function () {

            let descripcion = prompt("¿Desea editar la descripción?", this.gasto.descripcion);

            let valor = prompt("¿Desea editar el valor?", this.gasto.valor);

            let fecha = prompt("¿Desea introducir otra fecha en formato yyyy-mm-dd?", this.gasto.fecha);

            let etiquetas = prompt("¿Desea modificar las etiquetas?", this.gasto.etiquetas.toString());

            let valorANumero = Number(valor);

            let arrayEtiquetas = etiquetas.split(",");

            this.gasto.actualizarValor(valorANumero);

            this.gasto.actualizarDescripcion(descripcion);

            this.gasto.actualizarFecha(fecha);

            this.gasto.anyadirEtiquetas(...arrayEtiquetas);


            repintar();

        }

    }


    function BorrarHandle () {

        this.handleEvent = function () {

            gestionPresupuesto.borrarGasto(this.gasto.id);
            repintar();
        }

    }


    function BorrarEtiquetasHandle () {

          this.handleEvent = function () {

            this.gasto.borrarEtiquetas(this.etiqueta);

            repintar();
         }
    }


    function EditarHandleFormulario () {

        this.handleEvent = function (evento) {

            evento.currentTarget.disabled = true;

            var plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

            var formularioEditar = plantillaFormulario.querySelector("form");


            formularioEditar.elements.descripcion.value = this.gasto.descripcion;

            formularioEditar.elements.valor.value = this.gasto.valor.toString();

            formularioEditar.elements.fecha.value = this.gasto.fecha;


            for (let etiqueta of this.gasto.etiquetas) {

                    formularioEditar.elements.etiquetas.value += etiqueta + ", ";

            }


            let eventoSubmit = new EventoSubmit();

            eventoSubmit.gasto = this.gasto;


            let botonCancelar = formularioEditar.querySelector("button.cancelar");

            let eventoCancelar = new EventoCancelar();

            eventoCancelar.formulario = formularioEditar;

            eventoCancelar.activarBoton = evento.currentTarget;


            formularioEditar.addEventListener("submit", eventoSubmit);

            botonCancelar.addEventListener("click", eventoCancelar);


            let btnGastoEnviarApi = formularioEditar.querySelector("button.gasto-enviar-api");

            let gastoEnviarApiPut = new GastoEnviarApiPut ();

            gastoEnviarApiPut.gasto = this.gasto;


            btnGastoEnviarApi.addEventListener("click", gastoEnviarApiPut);



            let divFormulario = evento.target;

            divFormulario.after(plantillaFormulario);
        }
    }


    function GastoEnviarApiPut () {


        this.handleEvent = async function (evento) {

            try {
                
            let nombreUsuario = document.getElementById("nombre_usuario").value;

            let boton = evento.currentTarget;

            let formularioEditar = boton.closest("form");
            

            let descripcion = formularioEditar.elements.descripcion.value;

            let valor = Number(formularioEditar.elements.valor.value);

            let fecha = formularioEditar.elements.fecha.value;

            let etiquetas = formularioEditar.elements.etiquetas.value;

            let etiquetasArray = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);

            let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetasArray);

               
            if (nombreUsuario != ""){
    
                let respuesta = await fetch (`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}/${this.gasto.gastoId}`, {
    
                    method: "PUT",
    
                    headers: {
                        "Content-Type" : "application/json;charset=utf-8"
                    },
    
                    body: JSON.stringify(nuevoGasto)
                });
    
                if (respuesta.ok) {
    
                    cargarGastosApi();
                }
                else {
                    throw new Error ("Se ha producido un fallo de conexión");
                }
    
            }
            else {
                throw new Error ("Necesita rellenar el campo vacio con su nombre y apellido sin espacios");
            }
        } catch (error) {
    
            alert("Error: " + error.message);
        }
    
        }

        }

    



    function EventoSubmit () {


        this.handleEvent = function (evento) {

        evento.preventDefault();

        let descripcion = evento.currentTarget.elements.descripcion.value;

        let valor = Number(evento.currentTarget.elements.valor.value);

        let fecha = evento.currentTarget.elements.fecha.value;

        let etiquetas = evento.currentTarget.elements.etiquetas.value;

        let arrayEtiquetas = etiquetas.split(",");


        this.gasto.actualizarDescripcion(descripcion);

        this.gasto.actualizarValor(valor);

        this.gasto.actualizarFecha(fecha);

        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);

        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();

        }

}


     function eventoSubmit (evento) {


            evento.preventDefault();

            let descripcion = evento.currentTarget.elements.descripcion.value;

            let valor = Number(evento.currentTarget.elements.valor.value);

            let fecha = evento.currentTarget.elements.fecha.value;

            let etiquetas = evento.currentTarget.elements.etiquetas.value;

            let arrayEtiquetas  = etiquetas.split(",");

            let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas);

            gestionPresupuesto.anyadirGasto(nuevoGasto);

            repintar();

            document.getElementById("anyadirgasto-formulario").disabled = false;

}


    function EventoCancelar () {

        this.handleEvent = function () {

            this.formulario.remove();
            this.activarBoton.disabled = false;

        }

    }


    function nuevoGastoWebFormulario (evento) {


        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        var formulario = plantillaFormulario.querySelector("form");

        document.getElementById("anyadirgasto-formulario").disabled = true;



        formulario.addEventListener("submit", eventoSubmit);


        let botonCancelar = formulario.querySelector("button.cancelar");

        let eventoCancelar = new EventoCancelar();

        eventoCancelar.formulario = formulario;

        eventoCancelar.activarBoton = evento.currentTarget;

        botonCancelar.addEventListener("click", eventoCancelar);



        let btnGastoEnviarApi = formulario.querySelector("button.gasto-enviar-api");


        btnGastoEnviarApi.addEventListener("click", async function () {

            try {

            
            let descripcion = formulario.elements.descripcion.value;
            let valor = Number(formulario.elements.valor.value);
            let fecha = formulario.elements.fecha.value;
            let etiquetas = formulario.elements.etiquetas.value;

            let etiquetasArray = gestionPresupuesto.transformarListadoEtiquetas(etiquetas);

            let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetasArray);


            let nombreUsuario = document.getElementById("nombre_usuario").value;


            if (nombreUsuario != "") {
                
                let respuesta = await fetch (`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`, {

                    method: "POST",
    
                    headers: {
                        "Content-Type" : "application/json;charset=utf-8"
                    },
    
                    body: JSON.stringify(nuevoGasto)
                });
    
                if (respuesta.ok) {
    
                    cargarGastosApi();
        
                }
                else {
                    throw new Error ("Fallo de conexión");
                }
    
            }

            else {
                throw new Error ("Necesita rellenar el campo con su nombre y apellido, sin espacios");
            }

        } catch (error) {

            alert("Error: " + error.message);
        }

        
        });


        let divControlesPrincipales = document.getElementById("controlesprincipales");


        divControlesPrincipales.append(plantillaFormulario);

    }


    let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");

    botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);



    function guardarGastosWeb() {

        let arrayGastos = JSON.stringify(gestionPresupuesto.listarGastos());

        localStorage.setItem("GestorGastosDWEC", arrayGastos);

    }

    let btnGuardarGastos = document.getElementById("guardar-gastos");

    btnGuardarGastos.addEventListener("click", guardarGastosWeb);



    function cargarGastosWeb() {

        let gastosJSON = localStorage.getItem("GestorGastosDWEC");

        if(gastosJSON != null) {

            gestionPresupuesto.cargarGastos(JSON.parse(gastosJSON));
        }
        else {
            gestionPresupuesto.cargarGastos([]);
        }

        repintar();
    }

    let btnCargarGastos = document.getElementById("cargar-gastos");

    btnCargarGastos.addEventListener("click", cargarGastosWeb);



    function filtrarGastosWeb (evento) {

        evento.preventDefault();

        let descripcion =  document.getElementById("formulario-filtrado-descripcion").value;
        let fechaDesde =  document.getElementById("formulario-filtrado-fecha-desde").value;
        let fechaHasta = document.getElementById("formulario-filtrado-fecha-hasta").value;
        let valorMinimo = document.getElementById("formulario-filtrado-valor-minimo").value;
        let valorMaximo = document.getElementById("formulario-filtrado-valor-maximo").value;
        let etiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene").value;

        let divListadoGastosCompleto = document.getElementById("listado-gastos-completo");
        divListadoGastosCompleto.innerHTML = "";
        let divListadoGastosFiltrado1 = document.getElementById("listado-gastos-filtrado-1");
        divListadoGastosFiltrado1.innerHTML = "";
        let divListadoGastosFiltrado2 = document.getElementById("listado-gastos-filtrado-2");
        divListadoGastosFiltrado2.innerHTML = "";
        let divListadoGastosFiltrado3 = document.getElementById("listado-gastos-filtrado-3");
        divListadoGastosFiltrado3.innerHTML = "";
        let divListadoGastosFiltrado4 = document.getElementById("listado-gastos-filtrado-4");
        divListadoGastosFiltrado4.innerHTML = "";
        let divListadoGastosAgrupacionDia = document.getElementById("agrupacion-dia");
        divListadoGastosAgrupacionDia.innerHTML = "";
        let divListadoGastosAgrupacionMes = document.getElementById("agrupacion-mes");
        divListadoGastosAgrupacionMes.innerHTML = "";
        let divListadoGastosAgrupacionAnyo = document.getElementById("agrupacion-anyo");
        divListadoGastosAgrupacionAnyo.innerHTML = "";


        if (descripcion == "" && fechaDesde == "" && fechaHasta == "" && valorMinimo == "" && valorMaximo == "" && etiquetas == "") {

            repintar();
        }

        else {


        let objeto = {

            descripcionContiene: descripcion,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta,
            valorMinimo: valorMinimo,
            valorMaximo: valorMaximo,
            etiquetasTiene: gestionPresupuesto.transformarListadoEtiquetas(etiquetas)
        };


        let filtrado = gestionPresupuesto.filtrarGastos(objeto);

        for (let gasto of filtrado) {

            mostrarGastoWeb("listado-gastos-completo", gasto);
        }

        }

    }

    let formulario = document.getElementById("formulario-filtrado");

    formulario.addEventListener("submit", filtrarGastosWeb);



    async function cargarGastosApi() {

        let nombreUsuario = document.getElementById("nombre_usuario").value;

        try {

        
        if (nombreUsuario != "") {

            let respuesta = await fetch (`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${nombreUsuario}`,
                {
                    method: "GET"
                }
            );
    
            if (respuesta.ok) {
                let datos = await respuesta.json();
    
                gestionPresupuesto.cargarGastos(datos);
                repintar();
            }
            else {
                throw new Error ("Fallo de conexión");
            }
        }
        else {
            throw new Error ("Necesita rellenar el campo vacío con su nombre y apellido sin espacio");
        }
    } catch (error) {

        alert("Error: " + error.message);
    }

    }


    let btnCargarGastosApi = document.getElementById("cargar-gastos-api");

    btnCargarGastosApi.addEventListener("click", cargarGastosApi);




    

export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}