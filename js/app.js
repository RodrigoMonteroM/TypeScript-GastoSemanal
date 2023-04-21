import { Presupuesto } from "./Presupuesto.js";
import { UI } from "./UI.js";
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");
const button = document.querySelector("button");
const inputNombre = formulario?.querySelector("#gasto");
const inputCantidad = formulario?.querySelector("#cantidad");
const gastoCheck = {
    nombre: "",
    cantidad: "",
};
let presupuestoUser;
eventListeners();
function eventListeners() {
    document.addEventListener("DOMContentLoaded", (e) => {
        preguntarPresupuesto(e);
        UI.disableButton(button, true);
    });
    formulario?.addEventListener("submit", (e) => agregargasto(e));
    inputCantidad.addEventListener("input", (e) => {
        const target = e.target;
        gastoCheck["cantidad"] = target.value;
        if (!Object.values(gastoCheck).includes("")) {
            UI.disableButton(button, false);
        }
    });
    inputNombre.addEventListener("input", (e) => {
        const target = e.target;
        gastoCheck["nombre"] = target.value;
        if (!Object.values(gastoCheck).includes("")) {
            UI.disableButton(button, false);
        }
    });
    gastoListado.addEventListener("click", (e) => {
        presupuestoUser.eliminarGastos(e);
        UI.imprimirGastosHTML(presupuestoUser.gastos, gastoListado);
        UI.actualizarRestante(presupuestoUser.restante);
        UI.comprobarPresuouesto(presupuestoUser);
    });
}
function preguntarPresupuesto(e) {
    const presupuestoUsuario = Number(prompt("Cual es tu presupuesto?")) ?? -1;
    if (presupuestoUsuario <= 0 || isNaN(presupuestoUsuario)) {
        window.location.reload();
    }
    presupuestoUser = new Presupuesto(presupuestoUsuario);
    UI.insertarPresupuesto(presupuestoUser);
}
function agregargasto(e) {
    e.preventDefault();
    const nombre = inputNombre.value;
    const cantidad = Number(inputCantidad.value);
    if (nombre === "" || isNaN(cantidad)) {
        UI.imprimirAlerta("Ambos casos son obligatorios", true, formulario);
        return;
    }
    else if (cantidad <= 0 || isNaN(cantidad)) {
        UI.imprimirAlerta("Cantidad invalida", true, formulario);
        return;
    }
    else {
        UI.imprimirAlerta("Gasto agregado", false, formulario);
    }
    const gasto = {
        nombre,
        cantidad,
        id: Date.now().toString(),
    };
    presupuestoUser.nuevoGasto(gasto);
    UI.imprimirGastosHTML(presupuestoUser.gastos, gastoListado);
    UI.actualizarRestante(presupuestoUser.restante);
    UI.comprobarPresuouesto(presupuestoUser);
    formulario.reset();
    UI.disableButton(button, true);
}
