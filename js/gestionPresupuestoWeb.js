

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

    divGastoEtiquetas.append(spanGastoEtiquetas);

    }

    divGasto.append(divGastoEtiquetas);

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



export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}