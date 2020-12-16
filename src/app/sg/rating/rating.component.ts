import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor(
    private title: Title
  ) {
    this.title.setTitle('Avaliaçoes');
  }

  ngOnInit(): void {
  }

}
