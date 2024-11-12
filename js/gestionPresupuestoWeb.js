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
    parrafoGastoFecha.textContent = gasto.fecha;
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

    elemento.append(divGasto);


}



function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

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


export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}