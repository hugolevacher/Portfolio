import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  skills = [
    { name: 'C#', logo: 'assets/c-sharp-icon.svg' },
    { name: 'Kotlin', logo: 'assets/kotlin-icon.svg' },
    { name: 'JavaScript', logo: 'assets/javascript-icon.svg' },
    { name: 'TypeScript', logo: 'assets/typescript-icon.svg' },
    { name: 'HTML', logo: 'assets/html-icon.svg' },
    { name: 'CSS', logo: 'assets/css-icon.svg' },
    { name: 'SQL', logo: 'assets/sql-icon.svg' },
    { name: 'Angular', logo: 'assets/angular-icon.svg' },
    { name: 'ASP.NET Core', logo: 'assets/microsoft-dot-net-icon.svg' },
    { name: 'Git', logo: 'assets/git-icon.svg' },
  ];
}
