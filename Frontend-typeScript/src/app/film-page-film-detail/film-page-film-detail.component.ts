import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-film-page-film-detail',
  templateUrl: './film-page-film-detail.component.html',
  styleUrls: ['./film-page-film-detail.component.css']
})
export class FilmPageFilmDetailComponent implements OnInit {
  
  @Input() name!: string;
  @Input() value!: string | number;

  constructor() { }

  ngOnInit(): void {
  }

}
