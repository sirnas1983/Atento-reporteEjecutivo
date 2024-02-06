import { Time } from "@angular/common"

export interface Improductividad {
    semana : number,
    dni : number,
    site : string,
    nombre : string,
    motivo : string,
    fecha : Date,
    jornada : Time,
    auxiliares : Time,
    transcripcion : Time,
    gIncorrectass : Time,
    tProductivo : Time,
    tImproductivo : Time,
    estado : String
}