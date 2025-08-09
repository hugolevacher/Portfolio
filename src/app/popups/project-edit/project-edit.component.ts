import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-project-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  @Input() project: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() projectUpdated = new EventEmitter<any>();

  order: number = 1;
  titleFr: string = '';
  titleEn: string = '';
  descriptionFr: string = '';
  descriptionEn: string = '';
  textFr: string = '';
  textEn: string = '';
  projectUrl: string = '';
  githubUrl: string = '';
  selectedImage: File | null = null;
  selectedVideo: File | null = null;
  isSubmitting: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (this.project) {
      this.order = this.project.order || 1;
      this.titleFr = this.project.titleFr || '';
      this.titleEn = this.project.titleEn || '';
      this.descriptionFr = this.project.descriptionFr || '';
      this.descriptionEn = this.project.descriptionEn || '';
      this.textFr = this.project.textFr || '';
      this.textEn = this.project.textEn || '';
      this.projectUrl = this.project.projectUrl || '';
      this.githubUrl = this.project.githubUrl || '';
    }
  }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0] || null;
  }

  onVideoSelected(event: any) {
    this.selectedVideo = event.target.files[0] || null;
  }

  async onSubmit() {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to edit projects.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    try {
      const orderValue = Number(this.order);
      const result = await this.api.updateProject(
        this.project.id,
        orderValue,
        this.titleFr.trim() || undefined,
        this.titleEn.trim() || undefined,
        this.descriptionFr.trim() || undefined,
        this.descriptionEn.trim() || undefined,
        this.textFr.trim() || undefined,
        this.textEn.trim() || undefined,
        this.projectUrl.trim() || undefined,
        this.githubUrl.trim() || undefined,
        this.selectedImage || undefined,
        this.selectedVideo || undefined
      );
      this.success = 'Project updated successfully!';
      this.projectUpdated.emit(result);

      setTimeout(() => {
        this.closePopup();
      }, 2000);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to update project.';
    } finally {
      this.isSubmitting = false;
    }
  }

  closePopup() {
    this.close.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closePopup();
    }
  }
}
