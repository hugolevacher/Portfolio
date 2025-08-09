import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-delete',
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.css'
})
export class ProjectDeleteComponent {
  @Input() project: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<any>();

  isDeleting: boolean = false;
  error: string | null = null;

  constructor(public api: ApiService) { }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  async confirmDelete() {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to delete projects.';
      return;
    }

    this.isDeleting = true;
    this.error = null;

    try {
      await this.api.deleteProject(this.project.id);
      this.projectDeleted.emit(this.project);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to delete project.';
      this.isDeleting = false;
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
