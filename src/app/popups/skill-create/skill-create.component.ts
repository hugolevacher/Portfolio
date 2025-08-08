import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-skill-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-create.component.html',
  styleUrl: './skill-create.component.css'
})
export class SkillCreateComponent {
  @Output() close = new EventEmitter<void>();
  @Output() skillCreated = new EventEmitter<any>();

  name: string = '';
  order: number = 1;
  selectedFile: File | null = null;
  isSubmitting: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private api: ApiService) { }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  async onSubmit() {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to create a skill.';
      return;
    }

    if (!this.name.trim()) {
      this.error = 'Name is required.';
      return;
    }

    if (!this.selectedFile) {
      this.error = 'Image is required.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    try {
      // Ensure order is a number
      const orderValue = Number(this.order);
      const result = await this.api.createSkill(this.name.trim(), orderValue, this.selectedFile);
      this.success = 'Skill created successfully!';
      this.skillCreated.emit(result);

      // Reset form
      this.name = '';
      this.order = 1;
      this.selectedFile = null;

      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

      // Close popup after 2 seconds
      setTimeout(() => {
        this.closePopup();
      }, 2000);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to create skill.';
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
