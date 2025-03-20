import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  skills = [
    { name: 'C#', logo: 'assets/c-sharp-icon.svg' },
    { name: 'Kotlin', logo: 'assets/kotlin-icon.svg' },
    { name: 'JavaScript', logo: 'assets/javascript-icon.svg' },
    { name: 'TypeScript', logo: 'assets/typescript-icon.svg' },
    { name: 'HTML', logo: 'assets/html-icon.svg' },
    { name: 'CSS', logo: 'assets/css-icon.svg' },
    { name: 'SQL', logo: 'assets/sql-icon.svg' },
    { name: 'Angular', logo: 'assets/angular-icon.svg' },
    { name: 'ASP.NET', logo: 'assets/microsoft-dot-net-icon.svg' },
    { name: 'Git', logo: 'assets/git-icon.svg' },
  ];

  projects = [
    {
      titlekey: 'data.projects.choculaterie.title',
      descriptionkey: 'data.projects.choculaterie.description',
      textkey: 'data.projects.choculaterie.text',
      image: 'assets/choculaterie.PNG',
      route: 'choculaterie',
      projectURL: 'https://choculaterie.com',
      githubRepo: '',
      video: ''
    },
    {
      titlekey: 'data.projects.mathgame.title',
      descriptionkey: 'data.projects.mathgame.description',
      textkey: 'data.projects.mathgame.text',
      image: 'assets/math-game.PNG',
      route: 'mathgame',
      projectURL: 'https://jeudecalcul.z27.web.core.windows.net',
      githubRepo: 'https://github.com/hugolevacher/MathGame',
      video: ''
    },
    {
      titlekey: 'data.projects.secretmessage.title',
      descriptionkey: 'data.projects.secretmessage.description',
      textkey: 'data.projects.secretmessage.text',
      image: 'assets/secret-messages.PNG',
      route: 'secretmessage',
      projectURL: '',
      githubRepo: 'https://github.com/hugolevacher/Encrypted_Messages',
      video: 'assets/Demo-secret-message.mp4'
    }
  ];
  constructor() { }
}
