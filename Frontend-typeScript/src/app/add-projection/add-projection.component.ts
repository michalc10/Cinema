import { Component, OnInit } from '@angular/core';
import { Film } from 'src/classes/film';
import { Projection } from 'src/classes/projection';
import { Room } from 'src/classes/room';
import { DataService } from '../data.service';
import { getFormattedDate, getFormattedTime, getStringForMinFunctionInDateTimeLocal } from 'src/utils/dateUtils';
import { Router } from '@angular/router';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-projection',
  templateUrl: './add-projection.component.html',
  styleUrls: ['./add-projection.component.css']
})
export class AddProjectionComponent implements OnInit {

  films: Film[] | null = null;
  listRooms: Room[] | null = null;
  projection = new Projection();
  minDate = getStringForMinFunctionInDateTimeLocal(new Date());
  // selectedFilm = new FormControl('valid');
  constructor(private dataService: DataService , private router: Router) {}

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

    this.dataService.roomsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.listRooms = this.dataService.rooms; 
          }
        }
      );
    this.dataService.getAllRooms();
  }

  onChangeTitle(id:string):void{
    this.projection.filmId = Number(id);
    console.log(typeof id, typeof Number(id), Number(id), id);
  

  }
  onChangeRoom(id:string):void{
    this.projection.roomNr = Number(id);
    // console.log(this.projection.filmId);
  }

  handleDateSelect(date:string):void{
    let pomDate = new Date(date);
    this.projection.date = getFormattedDate(pomDate);
    this.projection.time = getFormattedTime(pomDate);
  }

  addProjectionButton(): void{

    this.dataService.saveProjection(this.projection);
    this.router.navigateByUrl('/');
  }
}
