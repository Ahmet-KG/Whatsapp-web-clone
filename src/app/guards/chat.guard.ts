import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.afAuth.authState
      .pipe(map(user => user !== null),
        tap(value => {
          if (!value) {
            this.router.navigateByUrl('/login').then();
            return value;
          } else {
            return value;
          }
        })
        )
  }

}
