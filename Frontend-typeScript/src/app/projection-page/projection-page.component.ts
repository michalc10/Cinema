import { Component, OnInit, Input } from '@angular/core';
import { Projection } from 'src/classes/projection';

@Component({
  selector: 'app-projection-page',
  templateUrl: './projection-page.component.html',
  styleUrls: ['./projection-page.component.css']
})
export class ProjectionPageComponent implements OnInit {

  @Input() projection!: Projection;
  constructor() { }

  openReservationMenu(): void{
    Todo:" open rezerwation menu"
  }

  ngOnInit(): void {
  }

}
