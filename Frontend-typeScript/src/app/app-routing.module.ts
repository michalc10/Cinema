import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { AddFilmPageComponent } from './add-film-page/add-film-page.component';
import { AddProjectionPageComponent } from './add-projection-page/add-projection-page.component';

const routes: Routes = [
  { path: 'film/:filmid', component: FilmPageComponent },
  // { path: 'addprojection', component: AddProjectionPage },
  { path: 'addfilm', component: AddFilmPageComponent },
  { path: '', component: MainPageComponent, pathMatch: 'full'},
  { path: 'addprojection', component: AddProjectionPageComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
