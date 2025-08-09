import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TranslateModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
  currentSection: string = '';
  language: string = 'fr';
  menuOpen = false;
  isSmallScreen = false;
  isRotating = false;

  constructor(private router: Router, public translator: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage() {
    const savedLang = sessionStorage.getItem('language');
    if (savedLang && ['en', 'fr'].includes(savedLang)) {
      this.language = savedLang;
    } else {
      const browserLang = this.translator.getBrowserLang();
      if (browserLang && ['en', 'fr'].includes(browserLang)) {
        this.language = browserLang;
      } else {
        this.language = 'fr'; // Default to French
      }
      sessionStorage.setItem('language', this.language);
    }

    this.translator.setDefaultLang(this.language);
    this.translator.use(this.language);
  }

  ngOnInit() {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = document.querySelectorAll('section');
    let currentSectionId = '';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSectionId = section.id;
      }
    });

    this.currentSection = currentSectionId;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        this.scrollToElement(sectionId);
      });
    } else {
      this.scrollToElement(sectionId);
    }
  }

  private scrollToElement(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleLanguage() {
    if (this.language === 'en') {
      this.language = 'fr'
    } else {
      this.language = 'en'
    }
    sessionStorage.setItem('language', this.language);
    this.translator.use(this.language);
  }

  toggleMenu() {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth <= 768;
    if (!this.isSmallScreen) {
      this.menuOpen = false;
    }
  }
}
