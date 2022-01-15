import { Injectable } from '@angular/core';
import { Film } from 'src/classes/film';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private films: Film[] = [
    {
      "id": 1,
      "title": "Film1234567",
      "duration": 125
    },
    {
      "id": 2,
      "title": "Film2",
      "duration": 60
    },
    {
      "id": 3,
      "title": "Film3",
      "duration": 60
    },
    {
      "id": 5,
      "title": "Film5",
      "duration": 135
    },
    {
      "id": 6,
      "title": "Film6",
      "duration": 70
    },
    {
      "id": 7,
      "title": "Film7",
      "duration": 80
    },
    {
      "id": 8,
      "title": "Film-testowy",
      "duration": 20
    }
  ];

  constructor() { }

  getAllFilms() : Film[] {
    return this.films;
  }

  getFilmWithId(id: number): Film | undefined {
    return this.films.find(film => film.id === id);
  }
}
