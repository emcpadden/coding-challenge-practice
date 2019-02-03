import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  BASE_URL = "/api";

  constructor(private http: HttpClient) { 
  }

  getUsers(): Observable<User[]>  {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUser(id: number): Observable<User>  {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

}
