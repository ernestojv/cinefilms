import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theater } from 'src/app/core/models/theater.model';
import { TheaterService } from '../../services/theater.service';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  theaters: Theater[] = [];

  constructor(
    private theaterService: TheaterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTheaters();
  }

  getTheaters() {
    this.theaterService.getTheaters().subscribe(
      (theaters: any) => {
        this.theaters = theaters.data;
      }
    );
  }

}
