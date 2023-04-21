import { Gasto, Presupuesto } from "./Presupuesto.js";

export class UI {
  public static insertarPresupuesto(_presupuesto: Presupuesto): void {
    const { presupuesto, restante } = _presupuesto;
    const totalSpan = document.querySelector<HTMLSpanElement>("#total");
    const restanteSpan = document.querySelector<HTMLSpanElement>("#restante");
    if (totalSpan && restanteSpan) {
      totalSpan.textContent = presupuesto.toString();
      restanteSpan.textContent = restante.toString();
    }
  }

  public static imprimirAlerta(
    mensaje: string,
    error: boolean,
    ref: HTMLElement
  ): void {
    const divAlerta = document.createElement("DIV") as HTMLDivElement;
    divAlerta.textContent = mensaje;
    divAlerta.classList.add("text-center", "alert");

    if (error) {
      divAlerta.classList.remove("alert-success");
      divAlerta.classList.add("alert-danger");
    } else {
      divAlerta.classList.add("alert-success");
      divAlerta.classList.remove("alert-danger");
    }

    document.querySelector(".primario")?.insertBefore(divAlerta, ref);

    setTimeout(() => {
      document.querySelector(".primario")?.removeChild(divAlerta);
    }, 2000);
  }
  public static disableButton(
    button: HTMLButtonElement,
    disabled: boolean
  ): void {
    button.disabled = disabled;
  }

  public static imprimirGastosHTML(
    gastos: Array<Gasto>,
    ref: HTMLUListElement | HTMLElement
  ): void {
    this.clearHTML(ref);
    gastos.forEach((gasto: Gasto) => {
      const liGasto = document.createElement("LI") as HTMLLIElement;
      liGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      liGasto.innerHTML = `${gasto.nombre} <span class="badge badge-primary badge-pill">${gasto.cantidad}</span>`;
      liGasto.dataset.id = gasto.id;
      ref.appendChild(liGasto);

      //creare buttone per cancellare
      const btnBorrar = document.createElement("button") as HTMLButtonElement;
      btnBorrar.classList.add(
        "btn",
        "btn-danger",
        "btn-gasto",
        "text-white",
        "borrar-gasto"
      );
      btnBorrar.textContent = "X";
      liGasto.appendChild(btnBorrar);
    });
  }

  public static actualizarRestante(resestante: number): void {
    const spanRestante = document.querySelector<HTMLSpanElement>("#restante");
 
    if (spanRestante) {
      spanRestante.textContent = resestante.toString();
    }
  }

  public static comprobarPresuouesto(presupuestoObj: Presupuesto): void {
    const { restante, presupuesto } = presupuestoObj;
    const divRestante = document.querySelector<HTMLDivElement>(".restante");
    // comprobar 25%

    const porcentajeGastado: number = Number(
      (restante / presupuesto).toFixed(2)
    );

    // si he gastoado el el 75% el div se covierte en rojo
    if (porcentajeGastado < 1 - 0.75) {
      divRestante?.classList.remove("alert-success", "alert-warning");
      divRestante?.classList.add("alert-danger");
    } else if (porcentajeGastado < 1 - 0.5) {
      // si he gastoado el el 50% el div se covierte en amarillo
      divRestante?.classList.remove("alert-success", "alert-danger");
      divRestante?.classList.add("alert-warning");
    }

    // si el total es 0
    if (restante < 0) {
      const formulario =
        document.querySelector<HTMLFormElement>("#agregar-gasto");
      const button = document.querySelector<HTMLButtonElement>("button");  
      if (formulario && button) {
        UI.imprimirAlerta("Has Gastado todo el presupuesto", true, formulario);
        UI.disableButton(button, true);
      }
    }
  }

  private static clearHTML(ref: HTMLElement | HTMLUListElement) {
    while (ref.firstChild) {
      ref.removeChild(ref.firstChild);
    }
  }
}
