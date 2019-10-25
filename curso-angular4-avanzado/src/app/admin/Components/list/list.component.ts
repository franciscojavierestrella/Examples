import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../../Models/animal';
import { GLOBAL } from '../../../Services/global';
import { UserService } from '../../../Services/user.service';
import { AnimalService } from '../../../Services/animal.service';
import { UploadService } from '../../../Services/upload.service';
import { fadeLateral } from '../../animations';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  providers: [ UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class ListComponent implements OnInit {

  public title: string;
  public animales: Animal[];
  public url: string;
  public status;
  public busqueda;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService: AnimalService,
    private _userService: UserService
  ) {
    this.title = 'Listado Animales';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Cargado el OnInit');
    this.getAnimals();
  }

  getAnimals() {
    this._animalService.getAnimals().subscribe(
      response => {
        if (!response.animales) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.animales = response.animales;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  borrarAnimal(id) {
    $('#myModal-' + id).modal('hide');
    this._animalService.deleteAnimal(this._userService.getToken(), id).subscribe(
      response => {
        if (!response.animal) {
          alert(' Error en el servidor ');
          this._router.navigate(['/']);
        } else {
          this.getAnimals();
        }
      },
      error => {
        console.log(<any>error);
        alert(' Error en el servidor ');
      });
  }

}
