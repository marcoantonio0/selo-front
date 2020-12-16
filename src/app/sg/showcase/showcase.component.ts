import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  constructor(
    private title: Title
  ) {
    this.title.setTitle('Vitrines');
  }

  ngOnInit(): void {
  }

}
