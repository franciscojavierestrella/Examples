import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user';
import { GLOBAL } from '../../Services/global';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public titulo: String;
  public user: User;
  public status: String;
  public identity;
  public token;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService)  {
      this.titulo = 'Indentificate';
      this.user = new User('', '', '', '', '', '', '');
    }

  ngOnInit() {
    console.log('Login Creado');
    console.log(this._userService.getIdentity());

  }

  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response.user);
        this.identity = response.user;
        if ( !this.identity || !this.identity._id) {
          alert('Usuario no logado correctamente');
        } else {
          this.identity.password = '';
          // Almancenamos en el localStorage
          localStorage.setItem('identity', JSON.stringify(this.identity));
          // Obtenemos el token
          this._userService.signup(this.user, 'true').subscribe(
            resp => {
              this.token = resp.token;
              if ( this.token.length <= 0) {
                alert('El token no se ha generado');
              } else {
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this._router.navigate(['/']);
              }
            },
            error => {
              console.log(<any>error);
              this.status = 'error';
            });
        }
      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage != null) {
          const body = JSON.parse(error._body);
          this.status = 'error';
        }
        console.log(<any>error);
      }
    );
  }

}
