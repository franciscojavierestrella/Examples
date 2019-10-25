import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/core';
import {fadein} from '../animation';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  animations: [
    trigger('marcar', [
                state('inactive', style({
                  border: '5px solid #ccc'
                })),
                state('active', style({
                  border: '5px solid yellow',
                  borderRadius: '50px',
                  background: 'red'
                })),
                transition('inactive => active', animate('3s linear')),
                transition('active => inactive', animate('3s linear'))
              ]), fadein
  ]
})

export class TiendaComponent implements OnInit {
  public titulo: string;
  public nombreParque: string;
  public miParque;
  public dataTinymce;
  public status;

  constructor() {
    this.titulo = 'Esta es la tienda';
    this.status = 'inactive';
  }

  cambiarstatus(status) {
    if (status === 'inactive') {
      this.status = 'active';
    } else {
      this.status = 'inactive';
    }
  }

  mostrarNombre() {
    console.log(this.nombreParque);
  }

  verDatosParque(event) {
    console.log(event);
    this.miParque = event;
  }

  ngOnInit() {
    $('#textojq').hide();
    $('#botonjq').click(function() {
      $('#textojq').slideToggle();
    });
    $('#caja').dotdotdot({});
  }

}
