import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CacheService } from './cache.service';

const API_DOMAIN = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

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
    const cacheKey = this.cache.getApiStatusKey();
    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const data = await lastValueFrom(this.http.get<any>(`${API_DOMAIN}/health`));
      this.cache.set(cacheKey, data, 1 * 60 * 1000); // Cache for 1 minute
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getDbStatus(): Promise<any> {
    const cacheKey = this.cache.getDbStatusKey();
    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const data = await lastValueFrom(this.http.get<any>(`${API_DOMAIN}/health/db`));
      this.cache.set(cacheKey, data, 1 * 60 * 1000); // Cache for 1 minute
      return data;
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
    const cacheKey = this.cache.getSkillsKey();
    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const data = await lastValueFrom(this.http.get<any[]>(`${API_DOMAIN}/skills`));
      this.cache.set(cacheKey, data);
      return data;
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

      const data = await lastValueFrom(
        this.http.post<any>(`${API_DOMAIN}/skills`, formData, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate skills cache
      this.cache.invalidateSkillsCache();
      return data;
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

      const data = await lastValueFrom(
        this.http.put<any>(`${API_DOMAIN}/skills/${id}`, formData, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate skills cache
      this.cache.invalidateSkillsCache();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSkill(id: number): Promise<any> {
    try {
      const data = await lastValueFrom(
        this.http.delete<any>(`${API_DOMAIN}/skills/${id}`, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate skills cache
      this.cache.invalidateSkillsCache();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Projects API calls
  async getProjects(language: 'fr' | 'en' = 'en'): Promise<any[]> {
    const cacheKey = this.cache.getProjectsKey(language);
    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const data = await lastValueFrom(
        this.http.get<any[]>(`${API_DOMAIN}/projects`, {
          params: { lang: language }
        })
      );
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProject(id: number, language: 'fr' | 'en' = 'en'): Promise<any> {
    const cacheKey = this.cache.getProjectKey(id, language);
    const cached = this.cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const data = await lastValueFrom(
        this.http.get<any>(`${API_DOMAIN}/projects/${id}`, {
          params: { lang: language }
        })
      );
      this.cache.set(cacheKey, data);
      return data;
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

      const data = await lastValueFrom(
        this.http.post<any>(`${API_DOMAIN}/projects`, formData, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate projects cache for both languages
      this.cache.invalidateProjectsCache();
      return data;
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

      const data = await lastValueFrom(
        this.http.put<any>(`${API_DOMAIN}/projects/${id}`, formData, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate specific project cache and projects list cache
      this.cache.invalidateProjectCache(id);
      this.cache.invalidateProjectsCache();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id: number): Promise<any> {
    try {
      const data = await lastValueFrom(
        this.http.delete<any>(`${API_DOMAIN}/projects/${id}`, {
          headers: this.getAuthHeaders()
        })
      );

      // Invalidate specific project cache and projects list cache
      this.cache.invalidateProjectCache(id);
      this.cache.invalidateProjectsCache();
      return data;
    } catch (error) {
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userData');
  }

  // Method to clear all cache (useful for logout)
  clearCache(): void {
    this.cache.clear();
  }
}
