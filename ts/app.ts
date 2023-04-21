import { Presupuesto } from "./Presupuesto.js";
import { UI } from "./UI.js";

interface Gasto {
  nombre: string;
  cantidad: number;
  id: string;
}

// variables y selectores
const formulario = document.querySelector<HTMLFormElement>("#agregar-gasto")!;
const gastoListado = document.querySelector<HTMLUListElement>("#gastos ul")!;
const button = document.querySelector<HTMLButtonElement>("button")!;
const inputNombre = formulario?.querySelector<HTMLInputElement>("#gasto")!;
const inputCantidad = formulario?.querySelector<HTMLInputElement>("#cantidad")!;
const gastoCheck = {
  nombre: "",
  cantidad: "",
};
//instancias

let presupuestoUser: Presupuesto;

// eventos

eventListeners();
function eventListeners(): void {
  document.addEventListener("DOMContentLoaded", (e: Event) => {
    preguntarPresupuesto(e);
    UI.disableButton(button, true);
  });

  formulario?.addEventListener("submit", (e: Event) => agregargasto(e));

  inputCantidad.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    gastoCheck["cantidad"] = target.value;
    if (!Object.values(gastoCheck).includes("")) {
      UI.disableButton(button, false);
    }
  });

  inputNombre.addEventListener("input", (e: Event) => {
    const target = e.target as HTMLInputElement;
    gastoCheck["nombre"] = target.value;
    if (!Object.values(gastoCheck).includes("")) {
      UI.disableButton(button, false);
    }
  });

  gastoListado.addEventListener("click", (e: Event) => {
    //UI.eliminarGasto(e, presupuestoUser, gastoListado);
    presupuestoUser.eliminarGastos(e);
    UI.imprimirGastosHTML(presupuestoUser.gastos, gastoListado);
    UI.actualizarRestante(presupuestoUser.restante);
    UI.comprobarPresuouesto(presupuestoUser);
  });
}

//funciones
function preguntarPresupuesto(e: Event): void {
  const presupuestoUsuario: number =
    Number(prompt("Cual es tu presupuesto?")) ?? -1;

  if (presupuestoUsuario <= 0 || isNaN(presupuestoUsuario)) {
    window.location.reload();
  }

  //presupuesto valido
  presupuestoUser = new Presupuesto(presupuestoUsuario);
  UI.insertarPresupuesto(presupuestoUser);
}

function agregargasto(e: Event): void {
  e.preventDefault();

  const nombre: string = inputNombre.value;
  const cantidad: number = Number(inputCantidad.value);

  if (nombre === "" || isNaN(cantidad)) {
    UI.imprimirAlerta("Ambos casos son obligatorios", true, formulario);
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    UI.imprimirAlerta("Cantidad invalida", true, formulario);
    return;
  } else {
    UI.imprimirAlerta("Gasto agregado", false, formulario);
  }

  const gasto: Gasto = {
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
