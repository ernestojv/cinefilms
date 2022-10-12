import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/core/models/show.model';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  shows: Show[] = [];

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit(): void {
    this.getShows();
  }

  getShows() {
    this.showService.getShows().subscribe((shows: any) => {
      this.shows = shows.data;
    });
  }

}
