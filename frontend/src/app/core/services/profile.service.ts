import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models';
import { map } from 'rxjs/operators';

const URL = 'http://127.0.0.1:3001/api/profile';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private http: HttpClient) { }

    get(username: string): Observable<Profile> {
        return this.http.get<Profile>(`${URL}/${username}`);
    }
    get_followersUsers(username: string): Observable<Profile[]> {
        // console.log(`${URL}/${username}/get_followers`);
        return this.http.get<Profile[]>(`${URL}/${username}/get_followers`);
    }
    follow(username: string): Observable<any> {
        return this.http.post<any>(`${URL}/${username}/follow`, {});
    }

    unfollow(username: string): Observable<any> {
        return this.http.delete<any>(`${URL}/${username}/follow`);
    }
}