import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-projection-page',
  templateUrl: './add-projection-page.component.html',
  styleUrls: ['./add-projection-page.component.css']
})
export class AddProjectionPageComponent implements OnInit {

  constructor(private router: Router) {  }

  ngOnInit(): void {
  }

  returnToMain():void{
    this.router.navigateByUrl('/');
  }
}
