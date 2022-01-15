import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-film-page',
  templateUrl: './add-film-page.component.html',
  styleUrls: ['./add-film-page.component.css']
})
export class AddFilmPageComponent implements OnInit {

  filmTitle: string = '';
  filmDuration: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  returnToMain(): void {
    this.router.navigateByUrl('/');
  }

}
