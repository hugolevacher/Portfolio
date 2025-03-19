import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  project: any = null;
  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  ngOnInit() {
    let projectRoute = this.route.snapshot.paramMap.get('projectName');
    this.project = this.dataService.projects.find(p => p.route === projectRoute);
  }
}
