import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-create',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  @Output() close = new EventEmitter<void>();
  @Output() projectCreated = new EventEmitter<any>();

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
      this.error = 'You must be logged in to create a project.';
      return;
    }

    if (!this.titleFr.trim() || !this.titleEn.trim()) {
      this.error = 'Both French and English titles are required.';
      return;
    }

    if (!this.descriptionFr.trim() || !this.descriptionEn.trim()) {
      this.error = 'Both French and English descriptions are required.';
      return;
    }

    if (!this.textFr.trim() || !this.textEn.trim()) {
      this.error = 'Both French and English texts are required.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    try {
      const orderValue = Number(this.order);
      const result = await this.api.createProject(
        orderValue,
        this.titleFr.trim(),
        this.titleEn.trim(),
        this.descriptionFr.trim(),
        this.descriptionEn.trim(),
        this.textFr.trim(),
        this.textEn.trim(),
        this.projectUrl.trim() || undefined,
        this.githubUrl.trim() || undefined,
        this.selectedImage || undefined,
        this.selectedVideo || undefined
      );
      this.success = 'Project created successfully!';
      this.projectCreated.emit(result);

      // Reset form
      this.resetForm();

      // Close popup after 2 seconds
      setTimeout(() => {
        this.closePopup();
      }, 2000);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to create project.';
    } finally {
      this.isSubmitting = false;
    }
  }

  resetForm() {
    this.order = 1;
    this.titleFr = '';
    this.titleEn = '';
    this.descriptionFr = '';
    this.descriptionEn = '';
    this.textFr = '';
    this.textEn = '';
    this.projectUrl = '';
    this.githubUrl = '';
    this.selectedImage = null;
    this.selectedVideo = null;

    // Reset file inputs
    const imageInput = document.getElementById('image') as HTMLInputElement;
    const videoInput = document.getElementById('video') as HTMLInputElement;
    if (imageInput) imageInput.value = '';
    if (videoInput) videoInput.value = '';
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
