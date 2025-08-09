import { Injectable } from '@angular/core';

interface CacheEntry {
    data: any;
    timestamp: number;
    ttl: number; // Time to live in milliseconds
}

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL

    constructor() { }

    private generateKey(endpoint: string, params?: any): string {
        if (params) {
            const paramString = Object.keys(params)
                .sort()
                .map(key => `${key}=${params[key]}`)
                .join('&');
            return `cache_${endpoint}_${paramString}`;
        }
        return `cache_${endpoint}`;
    }

    set(key: string, data: any, ttl: number = this.defaultTTL): void {
        const cacheEntry: CacheEntry = {
            data,
            timestamp: Date.now(),
            ttl
        };

        try {
            sessionStorage.setItem(key, JSON.stringify(cacheEntry));
        } catch (error) {
            console.warn('Cache: Failed to store data in session storage', error);
        }
    }

    get(key: string): any | null {
        try {
            const cached = sessionStorage.getItem(key);
            if (!cached) return null;

            const cacheEntry: CacheEntry = JSON.parse(cached);
            const now = Date.now();

            // Check if cache has expired
            if (now - cacheEntry.timestamp > cacheEntry.ttl) {
                this.delete(key);
                return null;
            }

            return cacheEntry.data;
        } catch (error) {
            console.warn('Cache: Failed to retrieve data from session storage', error);
            return null;
        }
    }

    delete(key: string): void {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.warn('Cache: Failed to delete data from session storage', error);
        }
    }

    clear(): void {
        try {
            // Remove only cache-related items
            const keys = Object.keys(sessionStorage);
            keys.forEach(key => {
                if (key.startsWith('cache_')) {
                    sessionStorage.removeItem(key);
                }
            });
        } catch (error) {
            console.warn('Cache: Failed to clear cache from session storage', error);
        }
    }

    // Helper methods for specific API endpoints
    getApiStatusKey(): string {
        return this.generateKey('api_status');
    }

    getDbStatusKey(): string {
        return this.generateKey('db_status');
    }

    getSkillsKey(): string {
        return this.generateKey('skills');
    }

    getProjectsKey(language: 'fr' | 'en'): string {
        return this.generateKey('projects', { lang: language });
    }

    getProjectKey(id: number, language: 'fr' | 'en'): string {
        return this.generateKey('project', { id, lang: language });
    }

    // Invalidate related caches (useful for updates/deletes)
    invalidateSkillsCache(): void {
        this.delete(this.getSkillsKey());
    }

    invalidateProjectsCache(): void {
        this.delete(this.getProjectsKey('fr'));
        this.delete(this.getProjectsKey('en'));
    }

    invalidateProjectCache(id: number): void {
        this.delete(this.getProjectKey(id, 'fr'));
        this.delete(this.getProjectKey(id, 'en'));
    }
}