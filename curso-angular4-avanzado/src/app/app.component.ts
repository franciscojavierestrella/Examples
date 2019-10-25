import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './Services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './Services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements DoCheck, OnInit {
  public title: String;
  emailContacto: string;
  public identity;
  public url;

  constructor ( private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService) {
    this.title = 'NGZOO';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.emailContacto = localStorage.getItem('ContactoEmail');
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.emailContacto = localStorage.getItem('ContactoEmail');
    this.identity = this._userService.getIdentity();
  }

  borrarEmail() {
    localStorage.removeItem('ContactoEmail');
    this.emailContacto = null;
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
