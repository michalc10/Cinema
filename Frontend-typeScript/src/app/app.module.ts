import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
// import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { FilmsPageComponent } from './films-page/films-page.component';
import { FilmDisplayComponent } from './film-display/film-display.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { FilmPageFilmDetailComponent } from './film-page-film-detail/film-page-film-detail.component';
import { ProjectionPageComponent } from './projection-page/projection-page.component';
import { ProjectionsPageComponent } from './projections-page/projections-page.component';
import { AddFilmPageComponent } from './add-film-page/add-film-page.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectionComponent } from './projection/projection.component';
import { EditFilmMenuComponent } from './edit-film-menu/edit-film-menu.component';
import { ReservationMenuComponent } from './reservation-menu/reservation-menu.component';
import { ReservationSelectorComponent } from './reservation-selector/reservation-selector.component';
import { AddProjectionComponent } from './add-projection/add-projection.component';
import { AddProjectionPageComponent } from './add-projection-page/add-projection-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FilmsPageComponent,
    FilmDisplayComponent,
    FilmPageComponent,
    FilmPageFilmDetailComponent,
    ProjectionPageComponent,
    ProjectionsPageComponent,
    AddFilmPageComponent,
    AddFilmComponent,
    ProjectionComponent,
    EditFilmMenuComponent,
    ReservationMenuComponent,
    ReservationSelectorComponent,
    AddProjectionComponent,
    AddProjectionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    // MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
