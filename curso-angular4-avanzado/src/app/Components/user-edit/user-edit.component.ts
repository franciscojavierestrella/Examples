import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { GLOBAL } from '../../Services/global';
import { UserService } from '../../Services/user.service';
import { UploadService } from '../../Services/upload.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit {
  public titulo: String;
  public user: User;
  public identity;
  public token;
  public status;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private uploadService: UploadService) {
    this.titulo = 'Edicion de datos personales';
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.identity = this.user;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Edición de Usuarios Creado...');
  }

  onSubmit() {
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          localStorage.setItem('identity', JSON.stringify(this.user));
          // Guardado de la imagen
          this.uploadService.makeFileRequest(this.url + '/uploadImage/' + this.user._id ,
                                            [] , this.filesToUpload, this.token, 'image').then(
                                              (result: any) => {
                                                this.user.image = result.image;
                                                localStorage.setItem('identity', JSON.stringify(this.user));
                                                console.log(this.user);
                                              }
                                            );
          this.status = 'success';
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
