import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';

const URL = 'http://127.0.0.1:3001/api/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private http: HttpClient
  ) {}

  // Verify JWT in localstorage with server & load user's info. This runs once on application startup.
 
  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken();
    console.log("token");
    if (token) {
      // console.log(token);
      this.apiService.get("user/").subscribe(
        (data) => {
          return this.setAuth({ ...data.user, token });
        },
        (err) => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.purgeAuth();
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  register(credentials: any): Observable<User> {
    console.log('credentials->user.service.ts resgistro',credentials);
    return this.apiService.post(`user/register`, { user: credentials }).pipe(
      map((data) => {
        console.log(data);
        return data;
      })
    );
  }

  login(credentials: any): Observable<User> {
    console.log('credentials->user.service.ts',credentials);
    return this.apiService.post(`user/login`, { user: credentials }).pipe(
      map((data) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  // Update the user on the server (email, pass, etc)
  update(user: any): Observable<User> {
    console.log("frontend user",user);
    return this.apiService.put('user/settings', { user }).pipe(
      map((data) => {
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}