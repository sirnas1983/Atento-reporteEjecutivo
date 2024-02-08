export interface Improductividad {
    semana: string;
    dni: string;
    site: string;
    supervisor: string;
    nombre: string;
    motivoDeApercibimiento: string;
    fecha: Date; // Changed to Date type for Excel date
    jornadaRegistrada: string; // Assuming Excel time is represented as a string
    auxiliares: string; // Assuming Excel time is represented as a string
    transcripcion: string;
    grabasIncorrectas: string; // Assuming Excel time is represented as a string
    tiempoProductivo: string | Date; // Can be Excel time or string
    tiempoImproductivo: string; // Assuming Excel time is represented as a string
    estado: string;
  }
  