import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import User = firebase.User;
import { Router } from '@angular/router';
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;

export interface RoomData {
  name: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private pathParamState = new BehaviorSubject<string>('')
  pathParam: Observable<string>
  private user!: User

  constructor(private afs: AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router) {
    this.pathParam = this.pathParamState.asObservable();
    this.afAuth.authState.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
      }
    });
  }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then((data: UserCredential) => {
      if (data.user) {
        this.user = data.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigateByUrl('').then();
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
      }
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login').then();
    })
  }

  updatePathParamState(newPathParam: string | null) {
    if (newPathParam != null) {
      this.pathParamState.next(newPathParam);
    }
  }

  getUser(): User {
    return this.user;
  }
}
