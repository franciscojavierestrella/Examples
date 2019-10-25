import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../../Models/animal';
import { GLOBAL } from '../../../Services/global';
import { UserService } from '../../../Services/user.service';
import { AnimalService } from '../../../Services/animal.service';
import { UploadService } from '../../../Services/upload.service';
import { fadeLateral } from '../../animations';

@Component({
  selector: 'app-edit',
  templateUrl: '../add/add.component.html',
  providers: [ UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class EditComponent implements OnInit {
  public title: string;
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService
  ) {
    this.is_edit = true;
    this.title = 'Editar un Animal';
    this.animal = new Animal('', '', '', 2017, '', null);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('animal-add componente ha sido cargado..');
    this.getAnimal();
  }

  getAnimal() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      console.log('animal-add componente getAnimal valor del ID ' + id);

      this._animalService.getAnimal(id).subscribe(
        response => {
          if (!response.animalStore) {
            this._router.navigate(['/']);
          } else {
            this.animal = response.animalStore;
            console.log('animal-add componente imagen ' + this.animal.image);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

  onSubmit() {
    const id = this.animal._id;
    this._animalService.editAnimnal(this.token, id, this.animal).subscribe(
      response => {
        if (!response.animalUpdate) {
          this._router.navigate(['/']);
        } else {
          this.animal = response.animalUpdate;
          console.log(' Tenemos animal... ');
          if (this.filesToUpload) {
            // Guardado de la imagen
            this._uploadService.makeFileRequest(this.url + 'uploadImageAnimal/' + this.animal._id ,
                                              [] , this.filesToUpload, this.token, 'image').then(
                                                (result: any) => {
                                                  this.animal.image = result.image;
                                                  console.log(this.animal);
                                                }
                                              );
          }
          console.log(' Nos vamos al detalle. ' + this.animal._id);
          this._router.navigate(['/animal/', this.animal._id]);
        }

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileinput: any) {
    this.filesToUpload = <Array<File>>fileinput.target.files;
    console.log(this.filesToUpload);
  }
}
