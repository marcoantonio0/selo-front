import { AuthenticationCustomerService } from './../_services/authentication-customer.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationAdminService } from '../_services/authentication-admin.service';


@Injectable({ providedIn: 'root' })
export class AuthCustomerGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationCustomerService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
