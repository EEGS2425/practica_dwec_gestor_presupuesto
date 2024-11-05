import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";



gestionPresupuesto.actualizarPresupuesto(1500);


gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());


let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);


let totalGastos = gestionPresupuesto.calcularTotalGastos();

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", totalGastos);



let balance = gestionPresupuesto.calcularBalance();


gestionPresupuestoWeb.mostrarDatoEnId("balance-total", balance);


let listadoCompleto = gestionPresupuesto.listarGastos();


for (let gasto of listadoCompleto) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);

}


let gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});


for (let gasto of gastosSeptiembre2021) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


let gastosMasDe50 = gestionPresupuesto.filtrarGastos({

    valorMinimo: 50    
});


for (let gasto of gastosMasDe50) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}



let gastosMasDe200 = gestionPresupuesto.filtrarGastos({

    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});


for (let gasto of gastosMasDe200) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}


let gastosComidaTransporteMenosDe50 = gestionPresupuesto.filtrarGastos({

    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});


for (let gasto of gastosComidaTransporteMenosDe50) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}


let agruparPorDia = gestionPresupuesto.agruparGastos("dia");

let agruparPorMes = gestionPresupuesto.agruparGastos("mes");

let agruparPorAnyo = gestionPresupuesto.agruparGastos("anyo");




for (let [clave, valor] of Object.entries(agruparPorDia)) {
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", { [clave]: valor }, "día");
}

for (let [clave, valor] of Object.entries(agruparPorMes)) {
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", { [clave]: valor }, "mes");
}

for (let [clave, valor] of Object.entries(agruparPorAnyo)) {
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", { [clave]: valor }, "año");
}