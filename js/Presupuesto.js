export class Presupuesto {
    constructor(presupuesto, restante = presupuesto, gastos = []) {
        this.presupuesto = presupuesto;
        this.restante = restante;
        this.gastos = gastos;
        this.cantidadGastada = 0;
    }
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }
    eliminarGastos(e) {
        const target = e.target;
        const dataId = target.parentElement?.getAttribute("data-id");
        if (target.classList.contains("borrar-gasto")) {
            this.gastos = this.gastos.filter((gasto) => gasto.id !== dataId);
            this.calcularRestante();
        }
    }
    calcularRestante() {
        this.cantidadGastada = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - this.cantidadGastada;
    }
}
