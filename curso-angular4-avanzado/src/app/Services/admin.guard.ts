import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {
  public url: string;
  public identity;
  public token;

  constructor(
      private _router: Router,
      private _userService: UserService
  ) {
  }

  canActivate() {
    const identity = this._userService.getIdentity();

    if (identity && identity.role === 'ROLE_ADMIN') {
        return true;
    } else {
        this._router.navigate(['/home']);
        return false;
    }
  }
}
