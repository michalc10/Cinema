import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Projection } from 'src/classes/projection';
import { ProjectionInformation } from 'src/classes/projection_information';
import { DataService } from '../data.service';
import { ProjectionService } from '../projection.service';
import {getDateFromProjection} from '../../utils/dateUtils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projections-page',
  templateUrl: './projections-page.component.html',
  styleUrls: ['./projections-page.component.css']
})
export class ProjectionsPageComponent implements OnInit {

  @Output() openMenu: EventEmitter<number> = new EventEmitter(); 
  dateOffset = true;
  today?: Date;
  dateOfProjections = new Date(Date.now());
  projectionService?: ProjectionService;
  projections?: ProjectionInformation[];

  constructor( private dataService: DataService, private router: Router) { 
    this.projectionService = new ProjectionService();
    this.projections = this.projectionService.getAllProjections();
  }

  ngOnInit(): void {
    this.dataService.filmsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateProjections();
          }
        }
      );
    this.dataService.getAllFilms();

    this.dataService.roomsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateProjections();
          }
        }
      );
    this.dataService.getAllRooms();

    this.dataService.projectionsNotifier.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            this.updateProjections();
          }
        }
      );
    this.dataService.getProjectionsForDate(this.dateOfProjections);
  }

  openReservationMenu(projectionId?: number ):void{
    this.openMenu.emit(projectionId);
  }

  updateProjections(): void {

    this.projections = [];

    let currentDate = new Date();

  
    let fromDate = this.dateOfProjections.resetTime();
    let toDate = this.dateOfProjections.resetTime().addDays(1);
    let projections = [];

    // dodanie wszsytkich projekcji w wybranym przedziale czasowym
    for (let proj of this.dataService.projections) {
        let projDate = getDateFromProjection(proj);
        if (projDate >= fromDate && projDate >= (new Date()) && projDate < toDate) {
            projections.push(proj);
        }
    }

    projections.sort((a, b) => {
        let firstDate = getDateFromProjection(a);
        let secondDate = getDateFromProjection(b);
        return (firstDate.getTime() - secondDate.getTime());
    });

    let projectionsComponents = [];
    for (let proj of projections) {
        let projectionId = proj['id'];
        let projectionRoom = (this.dataService.rooms?.find((room) => room['nr'] == proj['roomNr'])) ?? undefined;
        let projectionRoomName = (projectionRoom) ? 'Sala nr.' + projectionRoom['nr'] : '?';
        let projectionRoomNumberOfSeats = (projectionRoom) ? projectionRoom['numberOfSeats'] : 0;
        let projectionFilm = (this.dataService.films?.find((film) => film['id'] == proj['filmId'])) ?? undefined;
        let projectionFilmTitle = (projectionFilm) ? projectionFilm['title'] : '??';
        this.projections.push(
          new ProjectionInformation(projectionId ?? -1, proj.date ?? '00.00.0000', proj.time ?? '00:00', projectionRoomName, proj.availableTicketsCount ?? 0, projectionRoomNumberOfSeats ?? 0, projectionFilmTitle ?? "??")
            // <ProjectionComponent key={proj['id']} openReservationMenu={() => this.openReservationMenu(projectionId)} filmTitle={projectionFilmTitle} date={proj['date']} time={proj['time']} roomName={projectionRoomName} availableTickets={proj['available-tickets-count']} numberOfSeats={projectionRoomNumberOfSeats} />
        );
    }
  }


  addProjectionPressed(): void {
    
    this.router.navigateByUrl('/addprojection');
  }


  decreaseDate(): void {
    if(this.dateOffset == false)
    {
        this.dateOfProjections.setDate(this.dateOfProjections.getDate() - 1);
        this.dataService.getProjectionsForDate(this.dateOfProjections);

    }
    this.today = new Date(Date.now());
    if(this.dateOfProjections.getDate() == this.today.getDate() 
        && this.dateOfProjections.getMonth() == this.today.getMonth()
        && this.dateOfProjections.getFullYear() == this.today.getFullYear()){
          
        this.dateOffset = true;
    }

  }

  increaseDate(): void {
    this.dateOffset = false;

    this.dateOfProjections.setDate(this.dateOfProjections.getDate() + 1);
    this.dataService.getProjectionsForDate(this.dateOfProjections);
    console.log(this.dateOfProjections.getDate());
  }
}
