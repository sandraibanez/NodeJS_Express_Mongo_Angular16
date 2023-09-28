// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Comment } from '../models';
// import { ApiService } from './api.service';
// import { map } from 'rxjs/operators';

// const URL = 'http://localhost:3000/api/comments';

// @Injectable({
//     providedIn: 'root'
// })
// export class CommentService {

//     constructor(private http: HttpClient, private apiService: ApiService) { }

//     get_all(slug: String): Observable<Comment[]> {      
//         return this.http.get<Comment[]>(`${URL}/${slug}`);
//     }

//     create(slug: String, data: any): Observable<any> {
//         return this.http.post<any>(`${URL}/${slug}`, data);
//     }

//     delete(id: String): Observable<any> {
//         return this.http.delete<any>(`${URL}/${id}`);
//     }
    
//     getAll(slug: String): Observable<Comment[]> {
//         return this.apiService.get(`comments/${slug}`).pipe(map(data => data.comments));
//     }

//     add(slug: String, data: any): Observable<Comment> {
//         return this.apiService.post(`comments/${slug}`, { comment: data }).pipe(map(data => data.comment));
//     }

//     destroy(id: String) {
//         return this.apiService.delete(`comments/${id}`);
//     }
// }