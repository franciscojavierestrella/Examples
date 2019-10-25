import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../Models/animal';
import { GLOBAL } from '../../Services/global';
import { AnimalService } from '../../Services/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  providers: [ AnimalService ]
})

export class AnimalDetailComponent implements OnInit {
  public animal: Animal;
  public url: string;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
      console.log('Componente Animal Detail cargado');
      this.getAnimal();
  }

  getAnimal() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      console.log('Componente Animal getAnimal valor del ID ' + id);

      this._animalService.getAnimal(id).subscribe(
        response => {
          if (!response.animalStore) {
            this.status = 'error';
            this._router.navigate(['/']);
          } else {
            this.status = 'success';
            this.animal = response.animalStore;
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }
}
