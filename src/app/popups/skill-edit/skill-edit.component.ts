import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-skill-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.css'
})
export class SkillEditComponent {
  @Input() skill: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() skillUpdated = new EventEmitter<any>();

  name: string = '';
  order: number = 1;
  selectedFile: File | null = null;
  isSubmitting: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (this.skill) {
      this.name = this.skill.name || '';
      this.order = this.skill.order || 1;
    }
  }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  async onSubmit() {
    if (!this.isLoggedIn) {
      this.error = 'You must be logged in to edit skills.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    this.success = null;

    try {
      const orderValue = Number(this.order);
      const result = await this.api.updateSkill(
        this.skill.id,
        this.name.trim() || undefined,
        orderValue,
        this.selectedFile || undefined
      );
      this.success = 'Skill updated successfully!';
      this.skillUpdated.emit(result);

      setTimeout(() => {
        this.closePopup();
      }, 2000);
    } catch (error: any) {
      this.error = error?.error?.message || error?.message || 'Failed to update skill.';
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
