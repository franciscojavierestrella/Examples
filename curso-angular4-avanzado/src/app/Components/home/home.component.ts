import { Component, OnInit } from '@angular/core';
import {fadein} from '../animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadein]
})
export class HomeComponent implements OnInit {
  title = 'Zoologico';

  constructor() { }

  ngOnInit() {
    console.log('home.component cargado...');
  }

}
