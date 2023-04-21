export class UI {
    static insertarPresupuesto(_presupuesto) {
        const { presupuesto, restante } = _presupuesto;
        const totalSpan = document.querySelector("#total");
        const restanteSpan = document.querySelector("#restante");
        if (totalSpan && restanteSpan) {
            totalSpan.textContent = presupuesto.toString();
            restanteSpan.textContent = restante.toString();
        }
    }
    static imprimirAlerta(mensaje, error, ref) {
        const divAlerta = document.createElement("DIV");
        divAlerta.textContent = mensaje;
        divAlerta.classList.add("text-center", "alert");
        if (error) {
            divAlerta.classList.remove("alert-success");
            divAlerta.classList.add("alert-danger");
        }
        else {
            divAlerta.classList.add("alert-success");
            divAlerta.classList.remove("alert-danger");
        }
        document.querySelector(".primario")?.insertBefore(divAlerta, ref);
        setTimeout(() => {
            document.querySelector(".primario")?.removeChild(divAlerta);
        }, 2000);
    }
    static disableButton(button, disabled) {
        button.disabled = disabled;
    }
    static imprimirGastosHTML(gastos, ref) {
        this.clearHTML(ref);
        gastos.forEach((gasto) => {
            const liGasto = document.createElement("LI");
            liGasto.className =
                "list-group-item d-flex justify-content-between align-items-center";
            liGasto.innerHTML = `${gasto.nombre} <span class="badge badge-primary badge-pill">${gasto.cantidad}</span>`;
            liGasto.dataset.id = gasto.id;
            ref.appendChild(liGasto);
            const btnBorrar = document.createElement("button");
            btnBorrar.classList.add("btn", "btn-danger", "btn-gasto", "text-white", "borrar-gasto");
            btnBorrar.textContent = "X";
            liGasto.appendChild(btnBorrar);
        });
    }
    static actualizarRestante(resestante) {
        const spanRestante = document.querySelector("#restante");
        if (spanRestante) {
            spanRestante.textContent = resestante.toString();
        }
    }
    static comprobarPresuouesto(presupuestoObj) {
        const { restante, presupuesto } = presupuestoObj;
        const divRestante = document.querySelector(".restante");
        const porcentajeGastado = Number((restante / presupuesto).toFixed(2));
        if (porcentajeGastado < 1 - 0.75) {
            divRestante?.classList.remove("alert-success", "alert-warning");
            divRestante?.classList.add("alert-danger");
        }
        else if (porcentajeGastado < 1 - 0.5) {
            divRestante?.classList.remove("alert-success", "alert-danger");
            divRestante?.classList.add("alert-warning");
        }
        if (restante < 0) {
            const formulario = document.querySelector("#agregar-gasto");
            const button = document.querySelector("button");
            if (formulario && button) {
                UI.imprimirAlerta("Has Gastado todo el presupuesto", true, formulario);
                UI.disableButton(button, true);
            }
        }
    }
    static clearHTML(ref) {
        while (ref.firstChild) {
            ref.removeChild(ref.firstChild);
        }
    }
}
