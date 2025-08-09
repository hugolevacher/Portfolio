import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

const API_DOMAIN = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      const token = JSON.parse(userData).access_token;
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  getImageUrl(filename: string): string {
    return `${API_DOMAIN}/files/${filename}`;
  }

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

  // Skills API calls
  async getSkills(): Promise<any[]> {
    try {
      return await lastValueFrom(this.http.get<any[]>(`${API_DOMAIN}/skills`));
    } catch (error) {
      throw error;
    }
  }

  async createSkill(name: string, order: number, file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('order', order.toString());
      formData.append('file', file);

      return await lastValueFrom(
        this.http.post<any>(`${API_DOMAIN}/skills`, formData, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async updateSkill(id: number, name?: string, order?: number, file?: File): Promise<any> {
    try {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (order !== undefined) formData.append('order', order.toString());
      if (file) formData.append('file', file);

      return await lastValueFrom(
        this.http.put<any>(`${API_DOMAIN}/skills/${id}`, formData, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteSkill(id: number): Promise<any> {
    try {
      return await lastValueFrom(
        this.http.delete<any>(`${API_DOMAIN}/skills/${id}`, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  // Projects API calls
  async getProjects(language: 'fr' | 'en' = 'en'): Promise<any[]> {
    try {
      return await lastValueFrom(
        this.http.get<any[]>(`${API_DOMAIN}/projects`, {
          params: { lang: language }
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async createProject(
    order: number,
    titleFr: string,
    titleEn: string,
    descriptionFr: string,
    descriptionEn: string,
    textFr: string,
    textEn: string,
    projectUrl?: string,
    githubUrl?: string,
    image?: File,
    video?: File
  ): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('order', order.toString());
      formData.append('titleFr', titleFr);
      formData.append('titleEn', titleEn);
      formData.append('descriptionFr', descriptionFr);
      formData.append('descriptionEn', descriptionEn);
      formData.append('textFr', textFr);
      formData.append('textEn', textEn);
      if (projectUrl) formData.append('projectUrl', projectUrl);
      if (githubUrl) formData.append('githubUrl', githubUrl);
      if (image) formData.append('image', image);
      if (video) formData.append('video', video);

      return await lastValueFrom(
        this.http.post<any>(`${API_DOMAIN}/projects`, formData, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    id: number,
    order?: number,
    titleFr?: string,
    titleEn?: string,
    descriptionFr?: string,
    descriptionEn?: string,
    textFr?: string,
    textEn?: string,
    projectUrl?: string,
    githubUrl?: string,
    image?: File,
    video?: File
  ): Promise<any> {
    try {
      const formData = new FormData();
      if (order !== undefined) formData.append('order', order.toString());
      if (titleFr) formData.append('titleFr', titleFr);
      if (titleEn) formData.append('titleEn', titleEn);
      if (descriptionFr) formData.append('descriptionFr', descriptionFr);
      if (descriptionEn) formData.append('descriptionEn', descriptionEn);
      if (textFr) formData.append('textFr', textFr);
      if (textEn) formData.append('textEn', textEn);
      if (projectUrl) formData.append('projectUrl', projectUrl);
      if (githubUrl) formData.append('githubUrl', githubUrl);
      if (image) formData.append('image', image);
      if (video) formData.append('video', video);

      return await lastValueFrom(
        this.http.put<any>(`${API_DOMAIN}/projects/${id}`, formData, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: number): Promise<any> {
    try {
      return await lastValueFrom(
        this.http.delete<any>(`${API_DOMAIN}/projects/${id}`, {
          headers: this.getAuthHeaders()
        })
      );
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userData');
  }
}
