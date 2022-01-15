import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../../classes/film';

@Component({
  selector: 'app-film-display',
  templateUrl: './film-display.component.html',
  styleUrls: ['./film-display.component.css']
})
export class FilmDisplayComponent implements OnInit {

  @Input() film: Film | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToFilm(): void {
    this.router.navigateByUrl('/film/' + (this.film?.id ?? '-1'))
  }

}
