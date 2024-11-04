import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";
import * as gestionPresupuesto from "./gestionPresupuesto.js";



gestionPresupuesto.actualizarPresupuesto(1500);


gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());


let gasto1 = gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);


let totalGastos = gestionPresupuesto.calcularTotalGastos();

gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", totalGastos);



let balance = gestionPresupuesto.calcularBalance();



gestionPresupuestoWeb.mostrarDatoEnId("listado-gastos-completo", balance);


let listadoCompleto = gestionPresupuesto.listarGastos();



for (let gasto of Object.entries(listadoCompleto)) {

    gestionPresupuestoWeb.mostrarGastoWeb("listados-gastos-completo", gasto);

}


let gastosSeptiembre2021 = gestionPresupuesto.filtrarGastos({
    fechaDesde: "01-09-2021",
    fechaHasta: "30-09-2021"
});


for (let gasto in gastosSeptiembre2021) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


let gastosMasDe50 = gestionPresupuesto.filtrarGastos({

    valorMinimo: 50    
});


for (let gasto in gastosMasDe50) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}



let gastosMasDe200 = gestionPresupuesto.filtrarGastos({

    valorMinimo: 200
});


for (let gasto in gastosMasDe200) {

    gestionPresupuestoWeb.mostrarGastoWeb("seguros", gasto);
}


let gastosComidaTransporteMenosDe50 = gestionPresupuesto.filtrarGastos({

    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});


for (let gasto in gastosComidaTransporteMenosDe50) {

    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}


let agruparPorDia = gestionPresupuesto.agruparGastos("dia");

let agruparPorMes = gestionPresupuesto.agruparGastos("mes");

let agruparPorAnyo = gestionPresupuesto.agruparGastos("anyo");



for (let gasto in agruparPorDia) {

    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gasto, "dia");
}


for (let gasto in agruparPorMes) {

    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gasto, "mes");
}


for (let gasto in agruparPorAnyo) {

    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gasto, "anyo");
}
