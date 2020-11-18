import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private title: Title
  ) {
    this.title.setTitle(environment.pageTitle);
  }

  ngOnInit(): void {
  }

}
