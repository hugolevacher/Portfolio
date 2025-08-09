import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  skills: any[] = [];
  projects: any[] = [];
  sections: HTMLElement[] = [];
  currentSectionIndex: number = 0;
  hasPreviousSection: boolean = false;
  hasNextSection: boolean = true;

  // Loading and error states
  skillsLoading: boolean = false;
  projectsLoading: boolean = false;
  skillsError: string | null = null;
  projectsError: string | null = null;

  // Language subscription
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    public api: ApiService,
    private translateService: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    // Load initial data
    await this.loadSkills();
    await this.loadProjects();

    // Subscribe to language changes to reload projects
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(event => {
      this.loadProjects();
    });

    // Initialize sections after data is loaded
    setTimeout(() => {
      this.sections = Array.from(document.querySelectorAll('section'));
      this.updateArrowVisibility();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  get currentLanguage(): 'fr' | 'en' {
    return (this.translateService.currentLang as 'fr' | 'en') || 'fr';
  }

  async loadSkills(): Promise<void> {
    this.skillsLoading = true;
    this.skillsError = null;
    try {
      this.skills = await this.api.getSkills();
    } catch (error: any) {
      this.skillsError = error?.error?.message || error?.message || 'Failed to load skills';
      this.skills = [];
    } finally {
      this.skillsLoading = false;
    }
  }

  async loadProjects(): Promise<void> {
    this.projectsLoading = true;
    this.projectsError = null;
    try {
      const projectsData = await this.api.getProjects(this.currentLanguage);
      this.projects = projectsData.map(project => ({
        ...project,
        route: this.createRoute(project.title)
      }));
    } catch (error: any) {
      this.projectsError = error?.error?.message || error?.message || 'Failed to load projects';
      this.projects = [];
    } finally {
      this.projectsLoading = false;
    }
  }

  private createRoute(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }

  scrollToNextSection(): void {
    const currentScroll = window.scrollY;
    const nextSection = this.sections.find(section => section.offsetTop > currentScroll + 10);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToPreviousSection(): void {
    const currentScroll = window.scrollY;
    const previousSection = [...this.sections].reverse().find(section => section.offsetTop < currentScroll - 10);
    if (previousSection) {
      previousSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScroll = window.scrollY + window.innerHeight / 2; // Middle of the viewport
    this.currentSectionIndex = this.sections.findIndex(
      section => section.offsetTop <= currentScroll && section.offsetTop + section.offsetHeight > currentScroll
    );
    this.updateArrowVisibility();
  }

  private updateArrowVisibility(): void {
    this.hasPreviousSection = this.currentSectionIndex > 0;
    this.hasNextSection = this.currentSectionIndex < this.sections.length - 1;
  }
}
