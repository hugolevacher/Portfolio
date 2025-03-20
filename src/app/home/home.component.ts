import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  skills: any = [];
  projects: any = [];
  sections: HTMLElement[] = [];
  currentSectionIndex: number = 0;
  hasPreviousSection: boolean = false;
  hasNextSection: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.skills = this.dataService.skills;
    this.projects = this.dataService.projects;
    this.sections = Array.from(document.querySelectorAll('section'));
    this.updateArrowVisibility();
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
