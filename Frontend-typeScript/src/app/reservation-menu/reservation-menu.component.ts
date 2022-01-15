import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/classes/film';
import { Projection } from 'src/classes/projection';
import { Room } from 'src/classes/room';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reservation-menu',
  templateUrl: './reservation-menu.component.html',
  styleUrls: ['./reservation-menu.component.css']
})
export class ReservationMenuComponent implements OnInit {

  projection?: Projection;
  room?: Room;
  film?: Film;
  reservedSeatsNumbers: number[] = [];
  selectedSeatsNumbers: number[] = [];

  @Input() projectionId?: number;
  @Output() closeMenu: EventEmitter<void> = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.filmsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateComponent();
          }
        }
      );
    this.dataService.getAllFilms();

    this.dataService.roomsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateComponent();
          }
        }
      );
    this.dataService.getAllRooms();

    this.dataService.projectionsNotifier.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateComponent();
          }
        }
      );
  }

  updateComponent(): void {
    this.projection = this.dataService.projections.find(proj => proj.id == this.projectionId);
    this.film = this.dataService.films.find(film => film.id == this.projection?.filmId);
    this.room = this.dataService.rooms.find(room => room.nr == this.projection?.roomNr);

    this.reservedSeatsNumbers = this.projection?.reservedSeatsNumbers ?? [];
  }

  onSelected(seatNumber: number) {
    let projectionId = this.projectionId ?? -1;
    let projection = this.dataService.projections.find((proj) => proj['id'] == projectionId);

    if (projection && (projection.reservedSeatsNumbers?.includes(seatNumber) ?? false)) return;

    let newSelectedNumbers = [...(this.selectedSeatsNumbers)];
    let foundIndex = newSelectedNumbers.findIndex((num) => num == seatNumber);

    if (foundIndex >= 0) {
      newSelectedNumbers.splice(foundIndex, 1)
    } else {
      newSelectedNumbers.push(seatNumber)
    }
    this.selectedSeatsNumbers = newSelectedNumbers;
  }

  getPlacePlural(count: number) {
    if (count < 1) {
      return 'miejsc';
    } else if (count < 2) {
      return 'miejsce';
    } else if (count < 5) {
      return 'miejsca';
    } else {
      return 'miejsc';
    }
  }

  makeReservation() {
    if (this.selectedSeatsNumbers.length > 0) {
      this.dataService.makeReservation(this.projectionId ?? -1, this.selectedSeatsNumbers);
      this.closeMenu.emit();
    }
  }

  close() {
    this.closeMenu.emit();
  }

}
