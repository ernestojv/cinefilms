import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() realeaseDate: any = '';
  @Input() image: string = '';
  @Input() format: string = '';

  constructor() { }

  ngOnInit(): void {
    this.realeaseDate = new Date(this.realeaseDate);
  }

}
