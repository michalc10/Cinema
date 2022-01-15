import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reservation-selector',
  templateUrl: './reservation-selector.component.html',
  styleUrls: ['./reservation-selector.component.css']
})
export class ReservationSelectorComponent implements OnInit {

  @Input() numberOfSeats: number = 0;
  @Input() reservedSeatsNumbers!: number[];
  @Input() selectedSeatsNumbers!: number[];
  @Output() onSelectedSeat: EventEmitter<number> = new EventEmitter();

  public static numberOfSeatsInRow = 8;

  rows: number[][] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    this.rows = [];
    let currentRow: number[] = [];

    for (let i = 0; i < this.numberOfSeats; i++) {
      let buttonClass: number = 0;
      if (this.reservedSeatsNumbers.includes(i + 1)) {
        buttonClass = -1;
      }
      if (this.selectedSeatsNumbers.includes(i + 1)) {
        buttonClass = 1;
      }

      currentRow.push(buttonClass);

      if (i % 8 == 7) {
        this.rows.push(currentRow);
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      this.rows.push(currentRow);
      currentRow = [];
    }
  }

  onSelected(seatNumber: number): void {
    this.onSelectedSeat.emit(seatNumber);
  } 

}
