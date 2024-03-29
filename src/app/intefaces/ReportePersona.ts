import { ResumenEjecutivo } from "./ResumenEjecutivo";

export class ReportePersona {

    nombre: string;
    dni: string; // Add dni property
    cantidadRegistros: number;
    totalDescansos: number;
    totalDesvios: number;
    totalFaltas: number;
    totalImproductivos: number;
    totalTMO: number;
    totalTardanza: number;
    registros: ResumenEjecutivo[];
    porDescansos: number = 0;
    porDesvios: number = 0;
    porFaltas: number = 0;
    porImproductivos: number = 0;
    porTMO: number = 0;
    porTardanza: number = 0;
    weight: number = 0;

    constructor(nombre: string,
                cantidadRegistros: number,
                totalDescansos: number,
                totalDesvios: number,
                totalFaltas: number,
                totalImproductivos: number,
                totalTMO: number,
                totalTardanza: number,
                registros: ResumenEjecutivo[],
                registries: number,
                dni: string) { // Accept dni parameter
        this.nombre = nombre;
        this.dni = dni; // Assign dni to class property
        this.cantidadRegistros = cantidadRegistros;
        this.totalDescansos = totalDescansos;
        this.totalDesvios = totalDesvios;
        this.totalFaltas = totalFaltas;
        this.totalImproductivos = totalImproductivos;
        this.totalTMO = totalTMO;
        this.totalTardanza = totalTardanza;
        this.registros = registros;
        this.calcularPorcentajes();
        this.setWeight(registries);
    }

    private calcularPorcentajes() {
        if (this.cantidadRegistros !== 0) {
            this.porDescansos = Math.round(this.totalDescansos / this.cantidadRegistros * 10000) / 100;
            this.porDesvios = Math.round(this.totalDesvios / this.cantidadRegistros * 10000) / 100;
            this.porFaltas = Math.round(this.totalFaltas / this.cantidadRegistros * 10000) / 100;
            this.porImproductivos = Math.round(this.totalImproductivos / this.cantidadRegistros * 10000) / 100;
            this.porTMO = Math.round(this.totalTMO / this.cantidadRegistros * 10000) / 100;
            this.porTardanza = Math.round(this.totalTardanza / this.cantidadRegistros * 10000) / 100;
        }
    }

    public setWeight(totalRegistries: number) {
        this.weight = this.cantidadRegistros / totalRegistries;
    }
}
