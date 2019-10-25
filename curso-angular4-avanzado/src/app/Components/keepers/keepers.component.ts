import { Component, OnInit } from '@angular/core';
import {fadein} from '../animation';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { GLOBAL } from '../../Services/global';
import { UserService } from '../../Services/user.service';
import { UploadService } from '../../Services/upload.service';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.css'],
  providers: [UserService],
  animations: [fadein]
})

export class KeepersComponent implements OnInit {
  public title: string;
  public keepers: User[];
  public url;

  constructor(
    private _userService: UserService
  ) {
    this.title = 'Cuidadores';
    this.url = GLOBAL.url;
   }

  ngOnInit() {
    console.log('Keepers.component cargado...');
    this.getKeepers();
  }

  getKeepers() {
    this._userService.getKeepers().subscribe(
      response => {
        if (!response.users) {
        } else {
          this.keepers = response.users;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
