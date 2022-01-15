import { Injectable } from '@angular/core';
import { Projection } from 'src/classes/projection';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {

  private projections: Projection[] = [
  //   {
  //     "id": 1,
  //     "date": new Date("9.01.2022"),
  //     "filmTitle": "Film1234567",
  //     "time": "125",
  //     "roomName": 2,
  //     "availableTickets": 39,
  //     "numberOfSeats": 80
  //   },
  //   {
  //       "id": 2,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   },
  //   {
  //       "id": 3,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   },
  //   {
  //       "id": 4,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   },
  //   {
  //       "id": 5,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   },
  //   {
  //       "id": 6,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   },
  //   {
  //       "id": 7,
  //       "date": new Date(),
  //       "filmTitle": "Film1234567",
  //       "time": "125",
  //       "roomName": 2,
  //       "availableTickets": 39,
  //       "numberOfSeats": 80
  //   }
  ];

  constructor() { }

  getAllProjections() : Projection[] {
    return this.projections;
  }

  getProjectionWithId(id: number): Projection | undefined {
    return this.projections.find(projection => projection.id === id);
  }
}
