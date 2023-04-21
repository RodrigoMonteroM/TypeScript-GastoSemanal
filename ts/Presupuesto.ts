interface IPresupuesto {
  presupuesto: number;
  restante: number;
  gastos: Array<Gasto>;
  nuevoGasto: (gasto: Gasto) => void;
}

export interface Gasto {
  nombre: string;
  cantidad: number;
  id: string;
}

export class Presupuesto implements IPresupuesto {
  private cantidadGastada: number = 0;
  constructor(
    public presupuesto: number,
    public restante: number = presupuesto,
    public gastos: Array<Gasto> = []
  ) {}

  public nuevoGasto(gasto: Gasto): void {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  public eliminarGastos(e: Event): void {
    const target = e.target as HTMLUListElement;
    const dataId = target.parentElement?.getAttribute("data-id");
    if (target.classList.contains("borrar-gasto")) {
      this.gastos = this.gastos.filter((gasto: Gasto) => gasto.id !== dataId);
      this.calcularRestante();
    }
  }

  private calcularRestante(): void {
     this.cantidadGastada = this.gastos.reduce(
      (total: number, gasto: Gasto) => total + gasto.cantidad,
      0
    );
    
    this.restante = this.presupuesto - this.cantidadGastada;
  }
}
