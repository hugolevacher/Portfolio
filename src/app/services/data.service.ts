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
      route: 'choculaterie',
      projectURL: 'https://choculaterie.com',
      githubRepo: '',
      text: ['The Choculaterie is a space for Minecraft players to share their creations with other users. The website allows users to upload as soon as they create an account and always allows them to download. Registered users can also mark creations and other users as favorites to stay up to date with their favorite creators.', 'This website was made in collaboration with a friend. I was mostly in charge of the backend development using JavaScript, C#, ASP .NET Core and Microsoft Entity Framework. I built the controllers and classes necessary for the registration of users as well as the requests to the server to get the correct information.', 'Making this project, I learned how to securely manage user data and how to optimize requests to minimize server load and improve performance.'],
      video: ''
    },
    {
      title: 'Math game',
      image: 'assets/math-game.PNG',
      description: 'A fun and interactive math game for kids to learn basic arithmetic.',
      route: 'mathgame',
      projectURL: 'https://jeudecalcul.z27.web.core.windows.net',
      githubRepo: 'https://github.com/hugolevacher/MathGame',
      text: ['This website is a simple math game for kids to learn basic arithmetic (+-X÷). The website offers 3 difficulties and 2 modes , infinite mode, where you try and get the maximum score and learning mode, where you choose the number of questions and try to get the best score in %.', 'This website was made for my cousin, who was struggling with math. The game made him more motivated to work, so I am happy that my project helped him.', 'This project was made only using JavaScript, HTML and CSS.'],
      video: ''
    },
    {
      title: 'Secret message',
      image: 'assets/secret-messages.PNG',
      description: 'An app that allows users to encrypt and decrypt secret messages using AES encryption.',
      route: 'secretmessage',
      projectURL: '',
      githubRepo: 'https://github.com/hugolevacher/Encrypted_Messages',
      text: ['I made this AES encryption project to send funny messages to my friends and make them work to find the messages. That\'s it.', 'This project was made using C# and .NET Core. The encryption uses a randomized salt every time, so the same message will not return the same encryption string. It helped me research and understand different encryption methods and I discovered that the world of cryptography was more interesting than I thought.'],
      video: 'assets/Demo-secret-message.mp4'
    }
  ];
  constructor() { }
}
