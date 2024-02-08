export class ReportePatagonia {
    dni: string;
    idAudio: string;
    duracionAudio: string;
    duracionTranscripcion: string;
    objetivo3?: string;
    objetivo4?: string;
    fechaTranscripcion: Date;
    horaTranscripcion: string;
    desvio3?: string;
    desvio4?: string;
    nombre: string;

    constructor(dni: string, idAudio: string, duracionAudio: string, duracionTranscripcion:string, fechaTranscripcion: string, horaTranscripcion: string, nombre :string) {
        this.dni = dni;
        this.idAudio = idAudio;
        this.duracionAudio = duracionAudio;
        this.duracionTranscripcion = duracionTranscripcion;
        this.calculateObjetivo3();
        this.calculateObjetivo4();
        this.fechaTranscripcion = this.parseExcelDate(fechaTranscripcion);
        this.horaTranscripcion = this.parseExcelTime(String(Number(horaTranscripcion)%1));
        this.nombre = nombre;
    }

    calculateTotalMinutes(duration: string): number {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return hours * 60 + minutes + Math.ceil(seconds / 60);
    }

    calculateObjetivo3(): void {
        const totalMinutes = this.calculateTotalMinutes(this.duracionAudio);
        this.objetivo3 = String(totalMinutes * 3); // Adjust as needed
        this.calculateDesvio3();
    }

    calculateObjetivo4(): void {
        const totalMinutes = this.calculateTotalMinutes(this.duracionAudio);
        this.objetivo4 = String(totalMinutes * 4); // Adjust as needed
        this.calculateDesvio4();
    }

    calculateDesvio3(): void {
        const objetivo3Minutes = parseInt(this.objetivo3 || '0');
        const duracionTranscripcionMinutes = parseInt(this.duracionTranscripcion || '0');
        this.desvio3 = String(duracionTranscripcionMinutes - objetivo3Minutes);
    }
    
    calculateDesvio4(): void {
        const objetivo4Minutes = parseInt(this.objetivo4 || '0');
        const duracionTranscripcionMinutes = parseInt(this.duracionTranscripcion || '0');
        this.desvio4 = String(duracionTranscripcionMinutes - objetivo4Minutes);
    }
    

    private parseExcelDate(dateValue: any): Date {
        // Excel stores dates as the number of days since a specific epoch (usually December 30, 1899)
        // Assuming dateValue is the number of days since the epoch, we can create a Date object accordingly
        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const epoch = new Date('1899-12-31').getTime();
        const dateInMilliseconds = epoch + dateValue * millisecondsInDay;
        return new Date(dateInMilliseconds);
    }

    private parseExcelTime(timeValue: any): string {
        // Convert time value to number of hours, minutes, and seconds
        const hours = Math.floor(timeValue * 24);
        const minutes = Math.floor((timeValue * 24 * 60) % 60);
        const seconds = Math.floor((timeValue * 24 * 60 * 60) % 60);

        // Format the time string
        const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

        return formattedTime;
    }

    private padZero(num: number): string {
        // Add leading zero if the number is less than 10
        return num < 10 ? `0${num}` : `${num}`;
    }
}
