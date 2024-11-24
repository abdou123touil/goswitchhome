import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddHouseService {
  private apiUrl = 'http://localhost:3000/api/v1/homes/home'; // Backend URL

  constructor(private http: HttpClient) {}

  /**
   * Add a new house
   * @param houseData - FormData containing the house details and files
   * @returns Observable of the API response
   */
  addHouse(houseData: FormData): Observable<any> {
    const token = sessionStorage.getItem('auth_token');
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, houseData, { headers });
  }
}
