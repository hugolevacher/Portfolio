import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-skill-delete',
  imports: [CommonModule],
  templateUrl: './skill-delete.component.html',
  styleUrl: './skill-delete.component.css'
})
export class SkillDeleteComponent {
  @Input() skill: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() skillDeleted = new EventEmitter<any>();

  isDeleting: boolean = false;
  error: string | null = null;

  constructor(public api: ApiService) { }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  async confirmDelete() {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to delete skills.';
      return;
    }

    this.isDeleting = true;
    this.error = null;

    try {
      await this.api.deleteSkill(this.skill.id);
      this.skillDeleted.emit(this.skill);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to delete skill.';
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
