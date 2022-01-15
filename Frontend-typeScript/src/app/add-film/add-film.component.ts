import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/classes/film';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {

  film = new Film();

  // jeżeli pole jest undefined to znaczy, że uzytkownik nie edytował jeszcze tego pola
  filmTitleValid?: boolean = undefined;
  filmDurationValid?: boolean = undefined;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  checkNameValid(): boolean {
    if (this.film.title && this.film.title.length > 0) {
      return true;
    }
    return false
  }

  changeName(filmName: any): void {
    this.film.title = String(filmName.target.value);
    this.filmTitleValid = this.checkNameValid();
  }

  checkDurationValid(): boolean {
    if (this.film.duration && !Number.isNaN(this.film.duration)) {
      return true;
    }
    return false;
  }

  changeDuration(filmDuration: any): void {
    this.film.duration = Number.parseInt(filmDuration.target.value);
    this.filmDurationValid = this.checkDurationValid();
  }

  changeImageUrl(filmImageUrl: any): void {
    this.film.imageUrl = String(filmImageUrl.target.value);
  }

  addMovie(): void {
    this.filmTitleValid = this.checkNameValid();
    this.filmDurationValid = this.checkDurationValid();

    if (this.filmTitleValid && this.filmDurationValid) {
      this.dataService.saveFilm(this.film);
      this.router.navigateByUrl('/');
    }
  }

}
