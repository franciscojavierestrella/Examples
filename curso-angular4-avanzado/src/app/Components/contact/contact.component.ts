import { Component } from '@angular/core';
import {fadein} from '../animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadein]
})
export class ContactComponent {
  title = 'Contact';
  constructor() { }
}
