import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const API_DOMAIN = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  async getApiStatus(): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(`${API_DOMAIN}/health`));
    } catch (error) {
      throw error;
    }
  }

  async getDbStatus(): Promise<any> {
    try {
      return await lastValueFrom(this.http.get<any>(`${API_DOMAIN}/health/db`));
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string): Promise<any> {
    try {
      return await lastValueFrom(
        this.http.post<any>(`${API_DOMAIN}/auth/login`, { username, password })
      );
    } catch (error) {
      throw error;
    }
  }
}
