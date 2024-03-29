import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_RUNNER', 'ROLE_ORGANIZER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
