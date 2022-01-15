import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from 'src/classes/film';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Projection } from 'src/classes/projection';
import { Room } from 'src/classes/room';
import { getFormattedDate } from 'src/utils/dateUtils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:8080';

  films: Array<Film> = [];
  _filmsLoaded: boolean = false;
  filmsLoaded: Subject<boolean> = new BehaviorSubject<boolean>(false);

  projections: Array<Projection> = [];
  projectionsNotifier: Subject<boolean> = new BehaviorSubject<boolean>(false);

  rooms: Array<Room> = [];
  _roomsLoaded: boolean = false;
  roomsLoaded: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  private handleError<T>(operation: string = 'default', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Operation: ' + operation + ', failed with error: ');
      console.error(error);
      return of(result as T);
    }
  }

  

  getAllFilms(): void {
    if (!this._filmsLoaded) {
      this.http.get<Film[]>(this.serverUrl + '/films')
        .pipe(
          catchError(
            this.handleError<Film[]>('getAllFilms', [])
          )
        ).subscribe(
          value => {
            this.films = value;
            this._filmsLoaded = true;
            this.filmsLoaded.next(true);
          }
        );
    }
  }

  deleteFilm(filmId: number): void {
    this.http.delete(this.serverUrl + '/films/' + filmId)
      .pipe(
        catchError(
          this.handleError<undefined>('deleteFilm', undefined)
        )
      ).subscribe(
        value => {
          // przeładowanie filmów
          let newFilms: Array<Film> = [];
          this.films.forEach(film => {
            if (film.id != filmId) {
              newFilms.push(film);
            }
          });
          this.films = newFilms;
          this.filmsLoaded.next(true);

          // przeładowanie projekcji
          let newProjections: Array<Projection> = [];
          this.projections.forEach(projection => {
            if (projection.filmId != filmId) {
              newProjections.push(projection);
            }
          });
          this.projections = newProjections;
          this.projectionsNotifier.next(true);
        }
      );
  }

  getAllRooms(): void {
    if (!this._roomsLoaded) {
      this.http.get<Room[]>(this.serverUrl + '/rooms')
        .pipe(
          catchError(
            this.handleError<Room[]>('getAllRooms', [])
          )
        ).subscribe(
          value => {
            this.rooms = value;
            this._roomsLoaded = true;
            this.roomsLoaded.next(true);
          }
        );
    }
  }

  getProjections(filmId: number): void {
    this.http.get<Projection[]>(this.serverUrl + '/films/' + filmId + '/projections')
      .pipe(
        catchError(
          this.handleError<Projection[]>('getProjections', [])
        )
      ).subscribe(
        value => {
          value.forEach((proj) => {
            let nextProjectionIndex = this.projections.findIndex(p => p.id === proj.id);
            if (nextProjectionIndex < 0) {
              this.projections.push(proj);
            }
          });
          this.projectionsNotifier.next(true);
        }
      );
  }

  makeReservation(projectionId: number, seatsNumbers: Array<number>): void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<Array<number>>(this.serverUrl + '/projections/' + projectionId + '/reservations', { seats: seatsNumbers }, httpOptions)
      .pipe(
        catchError(
          this.handleError<Array<number>>('makeReservation', Array<number>())
        )
      ).subscribe(
        value => {
          let projection = this.projections.find(proj => proj.id == projectionId);
          if (projection) {
            value.forEach((seatNumber) => {
              if (!projection!.reservedSeatsNumbers?.includes(seatNumber)) {
                projection!.reservedSeatsNumbers?.push(seatNumber);
                if (projection?.availableTicketsCount) {
                  projection.availableTicketsCount -= 1;
                }
              }
            });
          }
          this.projectionsNotifier.next(true);
        }
      );
  }

  getProjectionsForDate(date: Date) {
    this.http.get<Projection[]>(this.serverUrl + '/projections/date/' + getFormattedDate(date).split('.').join(''))
      .pipe(
        catchError(
          this.handleError<Projection[]>('getProjectionsForDate', [])
        )
      ).subscribe(
        value => {
          value.forEach((proj) => {
            let nextProjectionIndex = this.projections.findIndex(p => p.id === proj.id);
            if (nextProjectionIndex < 0) {
              this.projections.push(proj);
            }
          });
          this.projectionsNotifier.next(true);
        }
      );
  }

  saveProjection(projection: Projection): void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<Projection>(this.serverUrl + '/projections', projection, httpOptions )
      .pipe(
        catchError(
          this.handleError<Projection>('saveProjection', {})
        )
      ).subscribe(
        value => {
          let foundIndex = this.projections.findIndex(proj => proj.id == value.id);
          if (foundIndex < 0) {
            this.projections.push(value);
          }
          this.projectionsNotifier.next(true);
        }
      );
  }

  saveFilm(film: Film): void {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<Film>(this.serverUrl + '/films', film, httpOptions )
      .pipe(
        catchError(
          this.handleError<Film>('saveFilm', {})
        )
      ).subscribe(
        value => {
          let foundIndex = this.films.findIndex(proj => proj.id == value.id);
          if(foundIndex < 0)
          {
            this.films.push(value);
          }
          this.filmsLoaded.next(true);
        }
      );
    
  }

  updateFilm(film: Film):void{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.put<Film>(this.serverUrl + '/films/' + film.id, film, httpOptions )
      .pipe(
        catchError(
          this.handleError<Film>('updateFilm', {})
        )
      ).subscribe(
        value => {
          let foundIndex = this.films.findIndex(f => f.id == film.id);

          if (foundIndex >= 0) {
            this.films.splice(foundIndex, 1, value);
          } else {
            this.films.push(value);
          }


          this.filmsLoaded.next(true);
        }
      );
  }
}
