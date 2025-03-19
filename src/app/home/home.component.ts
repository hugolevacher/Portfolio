import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  skills: any = [];
  projects: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.skills = this.dataService.skills;
    this.projects = this.dataService.projects;
  }
}
