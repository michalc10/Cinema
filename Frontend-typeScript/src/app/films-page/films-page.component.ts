import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from 'src/classes/film';
import { DataService } from '../data.service';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent implements OnInit {

  films: Film[] | null = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.filmsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.films = this.dataService.films; 
          }
        }
      );
    this.dataService.getAllFilms();
  }

  addFilmPressed(): void {
    this.router.navigateByUrl('/addfilm');
  }

}
