import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/classes/film';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-film-menu',
  templateUrl: './edit-film-menu.component.html',
  styleUrls: ['./edit-film-menu.component.css']
})
export class EditFilmMenuComponent implements OnInit {

  @Input() filmId?: number;
  @Output() closeMenu: EventEmitter<void> = new EventEmitter();

  filmTitle: string = '';
  filmDuration: string = '';
  filmImageUrl?: string;

  filmTitleError: boolean = false;
  filmDurationError: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    let film = this.dataService.films.find(film => film.id == this.filmId);

    if (film) {
      this.filmTitle = film.title ?? '';
      this.filmDuration = String(film.duration);
      this.filmImageUrl = film.imageUrl;
    }
  }

  onFilmTitleChange(newValue: string): void {
    let hasError = false;
    if (newValue.length <= 0) {
        hasError = true;
    }
    this.filmTitle = newValue;
    this.filmTitleError = hasError;
  }

  onFilmDurationChange(newValue: string): void {
    let hasError = false;
    if (newValue.length <= 0 || Number.isNaN(Number.parseInt(newValue))) {
        hasError = true;
    }
    this.filmDuration = newValue;
    this.filmDurationError = hasError;
  }

  onFilmImageUrlChange(newValue: string): void {
    this.filmImageUrl = newValue;
  }

  submit(): void {

    if (!this.filmTitleError && !this.filmDurationError) {
      let editedFilm: Film = new Film();
  
      editedFilm.id = this.filmId;
      editedFilm.title = this.filmTitle;
      editedFilm.duration = Number.parseInt(this.filmDuration);
      editedFilm.imageUrl = this.filmImageUrl;
  
      this.dataService.updateFilm(editedFilm);

      this.close();
    }

  }

  close(): void {
    this.closeMenu?.emit();
  }

}
