

function mostrarDatoEnId (idElemento, valor) {

    let elemento = document.getElementById(idElemento);

    elemento.textContent = valor;

}

function mostrarGastoWeb (idElemento, gasto) {

    let elemento = document.getElementById(idElemento);


    let divGasto = document.createElement("div");
    divGasto.classList("gasto");


    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.classList("gasto-descripcion");
    let parrafoGastoDescripcion = document.createElement("p");
    parrafoGastoDescripcion.textContent = gasto.descripcion;
    divGastoDescripcion.append(parrafoGastoDescripcion);


    let divGastoFecha = document.createElement("div");
    divGastoFecha.classList("gasto-fecha");
    let parrafoGastoFecha = document.createElement("p");
    parrafoGastoFecha.textContent = gasto.fecha;
    divGastoFecha.append(parrafoGastoFecha);


    let divGastoValor = document.createElement("div");
    divGastoValor.classList("gasto-valor");
    let parrafoGastoValor = document.createElement("p");
    parrafoGastoValor.textContent = gasto.valor;
    divGastoValor.append(parrafoGastoValor);


    divGasto.append(divGastoDescripcion);
    divGasto.append(divGastoFecha);
    divGasto.append(divGastoValor);


    let divGastoEtiquetas = document.createElement("div");
    divGastoEtiquetas.classList("gasto-etiquetas");

    
   for (let etiqueta of gasto.etiquetas) {

    let spanGastoEtiquetas = document.createElement("span");
    spanGastoEtiquetas.classList("gasto-etiquetas-etiqueta");
    
    spanGastoEtiquetas.textContent = etiqueta;

    divGastoEtiquetas.append(spanGastoEtiquetas);

    }

    divGasto.append(divGastoEtiquetas);

    elemento.append(divGasto);

}



function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

    let elemento = document.getElementById(idElemento);


    let divAgrupacion = document.createElement("div");
    divAgrupacion.classList("agrupacion");
    let h1GastosAgrupados = document.createElement("h1");
    h1GastosAgrupados.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.append(h1GastosAgrupados);


    Object.entries(agrup).forEach(([clave, valor]) => {

        let agrupacionDato = document.createElement("div");
        agrupacionDato.classList("agrupacion-dato");

        let agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.classList("agrupacion-dato-clave");
        agrupacionDatoClave.textContent = clave;
        agrupacionDato.append(agrupacionDatoClave);


        let agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.classList("agrupacion-dato-valor");
        agrupacionDatoValor.textContent = valor;
        agrupacionDato.append(agrupacionDatoValor);

        divAgrupacion.append(agrupacionDato);

    });

    elemento.append(divAgrupacion);

}


export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}