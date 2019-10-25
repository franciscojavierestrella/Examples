import { Component, OnInit, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-guardar-email',
  templateUrl: './guardar-email.component.html'
})
export class GuardarEmailComponent implements OnInit, DoCheck {
  title = 'Guardar Email';
  emailContacto: string;

  ngOnInit() {
    console.log('GuardarEmailComponent cargado...');
  }

  ngDoCheck() {
    console.log('DoCheck cargado...');
  }


  GuardarEmail() {
    localStorage.setItem('ContactoEmail', this.emailContacto);
    console.log('GuardarEmailComponent...' + this.emailContacto);
  }
}
