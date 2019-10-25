import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-mostrar-email',
  templateUrl: './mostrar-email.component.html'
})
export class MostrarEmailComponent implements OnInit, DoCheck {
  title = 'Mostrar email';
  emailContacto: string;

  ngOnInit() {
    this.emailContacto = localStorage.getItem('ContactoEmail');
  }

  ngDoCheck() {
    this.emailContacto = localStorage.getItem('ContactoEmail');
  }

  borrarEmail() {
    localStorage.removeItem('ContactoEmail');
    localStorage.clear();
    this.emailContacto = null;
  }

}
