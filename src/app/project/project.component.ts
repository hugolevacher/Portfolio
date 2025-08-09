import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [CommonModule, TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: any = null;
  projectLoading: boolean = false;
  projectError: string | null = null;
  projectId: number | null = null;

  // Language subscription
  private langChangeSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private translateService: TranslateService
  ) { }

  async ngOnInit() {
    // Get project ID from route
    const projectRoute = this.route.snapshot.paramMap.get('projectName');
    if (projectRoute) {
      // Extract ID from route (format: "id-title-slug")
      const idMatch = projectRoute.match(/^(\d+)-/);
      if (idMatch) {
        this.projectId = parseInt(idMatch[1], 10);
        await this.loadProject();

        // Subscribe to language changes
        this.langChangeSubscription = this.translateService.onLangChange.subscribe(event => {
          this.loadProject();
        });
      } else {
        this.projectError = 'Invalid project route format';
      }
    } else {
      this.projectError = 'Project not found';
    }
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  get currentLanguage(): 'fr' | 'en' {
    return (this.translateService.currentLang as 'fr' | 'en') || 'fr';
  }

  async loadProject(): Promise<void> {
    if (!this.projectId) return;

    this.projectLoading = true;
    this.projectError = null;

    try {
      const projectData = await this.api.getProject(this.projectId, this.currentLanguage);
      this.project = {
        ...projectData,
        imageUrl: projectData.image ? this.api.getImageUrl(projectData.image) : null,
        videoUrl: projectData.video ? this.api.getImageUrl(projectData.video) : null
      };
    } catch (error: any) {
      this.projectError = error?.error?.message || error?.message || 'Failed to load project';
      this.project = null;
    } finally {
      this.projectLoading = false;
    }
  }
}
