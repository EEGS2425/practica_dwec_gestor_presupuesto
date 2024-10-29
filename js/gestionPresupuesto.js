
let presupuesto = 0;

let gastos = [];

let idGasto = 0;


let listarGastos = () => gastos;


function anyadirGasto (nuevoGasto) {
    nuevoGasto.id = idGasto;
    idGasto++;
    gastos.push(nuevoGasto);
}

function borrarGasto (idDelete) {

    if (idDelete >= 0 && isFinite(idDelete)) {

        let encontrado = gastos.find(gasto => gasto.id == idDelete);

        if (encontrado) {

            let posEncontrado = gastos.indexOf(encontrado);
            
                gastos.splice(posEncontrado, 1);
        }
    }
}

function calcularTotalGastos () {

    let suma = 0;

    for (let precio of gastos) {
            suma += precio.valor;
    }

    return suma;
}

let calcularBalance = () => presupuesto - calcularTotalGastos();


function actualizarPresupuesto(cifra) {
    if (cifra > 0 && isFinite(cifra)) {
        presupuesto = cifra;
        return presupuesto;
    }
    else {
        return -1;
    }

}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}



 
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    let fechaPrueba = Date.parse(fecha);

    if (fechaPrueba) {
        this.fecha = fechaPrueba;
    }
    else {
        this.fecha = Date.parse(new Date());
    }


    this.valor = 0;

    if (valor > 0 && isFinite(valor)) {
        this.valor = valor;
    }


    this.descripcion = descripcion;


    this.etiquetas = [];

    this.anyadirEtiquetas = function(...arrayEtiquetas) {

        for (let etiqueta of arrayEtiquetas) {
            if (this.etiquetas.indexOf(etiqueta) == -1) {

                this.etiquetas.push(etiqueta);
        }
        }
    }

    this.anyadirEtiquetas(...etiquetas);



    this.borrarEtiquetas = function(...borrarEtiquetas) {


        for (let etiqueta of borrarEtiquetas) {

            if (this.etiquetas.indexOf(etiqueta) != -1) {

                let posEtiqueta = this.etiquetas.indexOf(etiqueta);
                        this.etiquetas.splice(posEtiqueta, 1);
            }
        }

    }



    this.mostrarGasto = () => `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;

    this.actualizarDescripcion = (nuevaDescripcion) => this.descripcion = nuevaDescripcion;

    this.actualizarValor = (nuevoValor) => {

        if (nuevoValor > 0 && isFinite(nuevoValor)) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function() {
            
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:\n`;

            for (let etiqueta of this.etiquetas) {

                texto += `- ${etiqueta}\n`;
            }
            
            return texto;
        };



        this.actualizarFecha = (fecha) => {
            let modificarFecha = Date.parse(fecha);
    
            if (modificarFecha) {
    
                this.fecha = modificarFecha;
            }
        }
    
       
    }        

    



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
