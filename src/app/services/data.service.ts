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
    { name: 'ASP.NET Core', logo: 'assets/microsoft-dot-net-icon.svg' },
    { name: 'Git', logo: 'assets/git-icon.svg' },
  ];

  projects = [
    {
      title: 'choculaterie.com',
      image: 'assets/choculaterie.PNG',
      description: 'An online space where users can publish and download Minecraft creations.',
      route: 'choculaterie'
    },
    {
      title: 'Math game',
      image: 'assets/math-game.PNG',
      description: 'A fun and interactive math game for kids to learn basic arithmetic.',
      route: 'mathgame'
    },
    {
      title: 'Secret message',
      image: 'assets/secret-messages.PNG',
      description: 'An app that allows users to encrypt and decrypt secret messages using AES encryption.',
      route: 'secretmessage'
    }
  ];
  constructor() { }
}
