import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from 'src/classes/film';
import { Projection } from 'src/classes/projection';
import { ProjectionInformation } from 'src/classes/projection_information';
import { DataService } from '../data.service';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.css']
})
export class FilmPageComponent implements OnInit {

  filmId: number = -1;
  filmToShow: Film | undefined | null = undefined;
  projections: ProjectionInformation[] = [];
  editFilmDialogOpen: boolean = false;
  currentlyOpenProjectionId: number = -1;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filmId = Number.parseInt(params.get('filmid') ?? '-1');
    });

    this.dataService.filmsLoaded.asObservable()
      .subscribe(
        value => {
          if (value === true) {
            let filmIndex: number = this.dataService.films.findIndex(film => film.id === this.filmId);
            if (filmIndex < 0) {
              this.filmToShow = null;
            } else {
              this.filmToShow = this.dataService.films[filmIndex];
            }
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
    this.dataService.getProjections(this.filmId);
  }

  updateProjections(): void {

    this.projections = [];

    let currentDate = new Date();

    let projections: Projection[] = [];
    if (this.filmId >= 0) {

      projections = this.dataService.projections
        .filter((proj) => {
          let projectionDateSplit = proj.date?.split('.') ?? ['00', '00', '0000'];
          let projectionTimeSplit = proj.time?.split(':') ?? ['00', '00'];
          let projectionFullDate = new Date(Number.parseInt(projectionDateSplit[2]), Number.parseInt(projectionDateSplit[1]) - 1, Number.parseInt(projectionDateSplit[0]), Number.parseInt(projectionTimeSplit[0]), Number.parseInt(projectionTimeSplit[1]));

          return proj.filmId === this.filmId
            && projectionFullDate >= currentDate;
        });

      projections.sort((first, second) => {
        let projectionDateSplitFirst = first.date?.split('.') ?? ['00', '00', '0000'];
        let projectionTimeSplitFirst = first.date?.split(':') ?? ['00', '00'];
        let projectionFullDateFirst = new Date(Number.parseInt(projectionDateSplitFirst[2]), Number.parseInt(projectionDateSplitFirst[1]) - 1, Number.parseInt(projectionDateSplitFirst[0]), Number.parseInt(projectionTimeSplitFirst[0]), Number.parseInt(projectionTimeSplitFirst[1]));

        let projectionDateSplitSecond = second.date?.split('.') ?? ['00', '00', '0000'];
        let projectionTimeSplitSecond = second.time?.split(':') ?? ['00', '00'];
        let projectionFullDateSecond = new Date(Number.parseInt(projectionDateSplitSecond[2]), Number.parseInt(projectionDateSplitSecond[1]) - 1, Number.parseInt(projectionDateSplitSecond[0]), Number.parseInt(projectionTimeSplitSecond[0]), Number.parseInt(projectionTimeSplitSecond[1]));

        return projectionFullDateFirst.getTime() - projectionFullDateSecond.getTime();
      });

    }

    let projectionsComponents = [];

    for (let projection of projections) {
      let projectionId = projection.id;
      let projectionRoom = (this.dataService.rooms?.find((room) => room['nr'] === projection.roomNr)) ?? undefined;
      let projectionRoomName = (projectionRoom) ? 'Sala nr.' + projectionRoom['nr'] : '?';
      let projectionRoomNumberOfSeats = (projectionRoom) ? projectionRoom.numberOfSeats : 0;
      this.projections.push(new ProjectionInformation(projectionId ?? -1, projection.date ?? '00.00.0000', projection.time ?? '00:00', projectionRoomName, projection.availableTicketsCount ?? 0, projectionRoomNumberOfSeats ?? 0));
    }
  }

  deleteFilm() {
    this.dataService.deleteFilm(this.filmId);
    this.router.navigateByUrl('/')
  }

  returnToMain() {
    this.router.navigateByUrl('/')
  }

  openReservationMenu(projectionId: number | undefined) {
    if (Number.isInteger(projectionId)) {
      this.currentlyOpenProjectionId = projectionId!;
    }
  }

  closeReservationMenu() {
    this.currentlyOpenProjectionId = -1;
  }

  openEditFilmMenu() {
    this.editFilmDialogOpen = true;
  }

  closeEditFilmMenu() {
    this.editFilmDialogOpen = false;
  }

}
