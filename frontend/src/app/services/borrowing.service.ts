import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CreateBorrowingPayload, Borrowing } from '../models/borrowing.model';

@Injectable({ providedIn: 'root' })
export class BorrowingService {
  private readonly url = `${environment.apiUrl}/borrowing`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.authService.getToken()}` });
  }

  create(payload: CreateBorrowingPayload): Observable<any> {
    return this.http.post(this.url, payload, { headers: this.headers() });
  }

  getBooksByUserId(userId: number): Observable<Borrowing[]> {
    return this.http.get<Borrowing[]>(`${this.url}/user/${userId}`, { headers: this.headers() });
  }
}
