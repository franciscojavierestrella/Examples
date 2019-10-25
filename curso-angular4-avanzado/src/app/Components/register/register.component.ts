import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { GLOBAL } from '../../Services/global';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public titulo: String;
  public user: User;
  public status: String;

  constructor( private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService) {
      this.titulo = 'Registro';
      this.user = new User('', '', '', '', '', '', '');
    }

  ngOnInit() {
    console.log('Registro Creado');
  }

  onSubmit(registerForm) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.user && response.user._id) {
          console.log('Registro de usuario' + this.user.email);
          this.status = 'success';
          this.user = new User('', '', '', '', '', 'ROLE_USER', '');
          registerForm.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
