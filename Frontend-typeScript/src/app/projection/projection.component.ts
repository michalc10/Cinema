import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-projection',
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.css']
})
export class ProjectionComponent implements OnInit {

  @Input() date!: string;
  @Input() time!: string;
  @Input() filmTitle?: string;
  @Input() roomName?: string;
  @Input() availableTickets?: number;
  @Input() numberOfSeats?: number;
  @Output() openReservationMenu: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    //todo:
    this.openReservationMenu.emit('');
  }

}
