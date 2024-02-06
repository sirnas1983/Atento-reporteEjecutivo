import { ResumenEjecutivo } from "./ResumenEjecutivo";

// export interface PersonaReporte {
//     'nombre' : String,
//     'cantidadRegistros' : Number,
//     'totalDescansos': Number,
//     'totalDesvios' : Number,
//     'totalFaltas': Number,
//     'totalImproductivos' : Number,
//     'totalTMO' : Number,
//     'totalTardanza': Number,
//     'registros' : ResumenEjecutivo[]
// }

export class ReportePersona {

    nombre : String;
    cantidadRegistros : number;
    totalDescansos: number;
    totalDesvios : number;
    totalFaltas: number;
    totalImproductivos : number;
    totalTMO : number;
    totalTardanza: number;
    registros : ResumenEjecutivo[];
    porDescansos: number = 0;
    porDesvios : number= 0;
    porFaltas: number= 0;
    porImproductivos : number= 0;
    porTMO : number= 0;
    porTardanza: number= 0;

    constructor(nombre : String,
    cantidadRegistros : number,
    totalDescansos : number,
    totalDesvios : number,
    totalFaltas : number,
    totalImproductivos : number,
    totalTMO : number,
    totalTardanza : number,
    registros : ResumenEjecutivo[]){
        this.nombre = nombre;
        this.cantidadRegistros = cantidadRegistros;
        this.totalDescansos = totalDescansos;
        this.totalDesvios = totalDesvios;
        this.totalFaltas=totalFaltas;
        this.totalImproductivos = totalImproductivos;
        this.totalTMO = totalTMO;
        this.totalTardanza = totalTardanza;
        this.registros = registros;
        this.calcularPorcentajes();
    }

    private calcularPorcentajes(){
        if (this.cantidadRegistros !== 0){
            this.porDescansos = Math.round(this.totalDescansos/this.cantidadRegistros * 10000)/100;
            this.porDesvios = Math.round(this.totalDesvios/this.cantidadRegistros * 10000)/100;
            this.porFaltas = Math.round(this.totalFaltas/this.cantidadRegistros * 10000)/100;
            this.porImproductivos = Math.round(this.totalImproductivos/this.cantidadRegistros * 10000)/100;
            this.porTMO = Math.round(this.totalTMO/this.cantidadRegistros * 10000)/100;
            this.porTardanza = Math.round(this.totalTardanza/this.cantidadRegistros * 10000)/100;
        }
    }
    
}