import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  navBarSelectedIndex: number = 0;
  currentlyOpenProjectionId: number = -1;

  constructor() { 
  }

  ngOnInit(): void {
  }

  openReservationMenu(projectionId: number): void {
    this.currentlyOpenProjectionId = projectionId;
  }

  closeReservationMenu(): void {
    this.currentlyOpenProjectionId = -1;
  }

  navBarItemClicked(id: number) {
    if (id === 1) {
      this.navBarSelectedIndex = 1;
    } else {
      this.navBarSelectedIndex = 0;
    }
  }

}
