export class ProjectionInformation {
    projectionId?: number;
    date?: string;
    time?: string;
    roomName?: string;
    availableTickets?: number;
    numberOfSeats?: number;
    filmTitle?: string;

    constructor(projectionId: number, date: string, time: string, roomName: string, availableTickets:number, numberOfSeats:number, filmTitle?:string) {
        this.projectionId = projectionId;
        this.date = date;
        this.time = time;
        this.roomName = roomName;
        this.availableTickets = availableTickets;
        this.numberOfSeats = numberOfSeats;
        this.filmTitle = filmTitle;
    }
}