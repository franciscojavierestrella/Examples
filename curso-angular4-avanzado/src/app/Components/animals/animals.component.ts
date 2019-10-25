import { Component, OnInit } from '@angular/core';
import {fadein} from '../animation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../Models/animal';
import { GLOBAL } from '../../Services/global';
import { AnimalService } from '../../Services/animal.service';


@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  providers: [ AnimalService ],
  animations: [fadein]
})
export class AnimalsComponent implements OnInit {
  public title: string;
  public animales: Animal[];
  public url;

  constructor(
    private _animalService: AnimalService
  ) {
    this.title = 'Animales';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Animals.component cargado...');
    this.getAnimals();
  }

  getAnimals() {
    this._animalService.getAnimals().subscribe(
      response => {
        if (!response.animales) {
        } else {
          this.animales = response.animales;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
