import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';
import {fadein} from '../animation';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.component.html',
  styleUrls: ['./parques.component.css'],
  animations: [fadein]
})

export class ParquesComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  @Input() nombre: string;
  public metros: number;
  public vegetacion: string;
  public abierto: boolean;
  @Output() pasameDatos = new EventEmitter();

  constructor() {
    this.nombre = 'Parque natural para caballos';
    this.metros = 450;
    this.vegetacion = 'Alta';
    this.abierto = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {
    console.log('Metodo OnInit lanzado');
  }

  ngDoCheck() {
    console.log('Metodo DoCheck Ejecutado');
  }

  ngOnDestroy() {
    console.log('Metodo OnDestroy Ejecutado');
  }


  emitirEvento() {
    this.pasameDatos.emit({
      'nombre': this.nombre,
      'metros': this.metros,
      'vegetacion' : this.vegetacion,
      'abierto': this.abierto
    });
  }

}
