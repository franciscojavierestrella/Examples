import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Animal } from '../../../Models/animal';
import { GLOBAL } from '../../../Services/global';
import { UserService } from '../../../Services/user.service';
import { AnimalService } from '../../../Services/animal.service';
import { UploadService } from '../../../Services/upload.service';
import { fadeLateral } from '../../animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [ UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class AddComponent implements OnInit {
  public title: string;
  public animal: Animal;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _animalService: AnimalService,
    private _uploadService: UploadService
  ) {
    this.title = 'Añadir';
    this.animal = new Animal('', '', '', 2017, '', null);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('animal-add componente ha sido creado');
  }

  onSubmit() {
    this._animalService.addAnimal(this.token, this.animal).subscribe(
      response => {
        if (!response.animal) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.animal = response.animal;

          if (!this.filesToUpload) {
            this._router.navigate(['/admin-panel/listado']);
          } else {
            // Guardado de la imagen
            this._uploadService.makeFileRequest(this.url + 'uploadImageAnimal/' + this.animal._id ,
                                              [] , this.filesToUpload, this.token, 'image').then(
                                                (result: any) => {
                                                  this.animal.image = result.image;
                                                  console.log(this.animal);
                                                }
                                              );
            this._router.navigate(['/admin-panel/listado']);
          }
        }

      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  fileChangeEvent(fileinput: any) {
    this.filesToUpload = <Array<File>>fileinput.target.files;
    console.log(this.filesToUpload);
  }

}
