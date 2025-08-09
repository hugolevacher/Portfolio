import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SkillCreateComponent } from '../popups/skill-create/skill-create.component';
import { SkillEditComponent } from '../popups/skill-edit/skill-edit.component';
import { SkillDeleteComponent } from '../popups/skill-delete/skill-delete.component';
import { ProjectCreateComponent } from '../popups/project-create/project-create.component';
import { ProjectEditComponent } from '../popups/project-edit/project-edit.component';
import { ProjectDeleteComponent } from '../popups/project-delete/project-delete.component';

@Component({
  selector: 'app-portal',
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule, SkillCreateComponent, SkillEditComponent, SkillDeleteComponent,
    ProjectCreateComponent, ProjectEditComponent, ProjectDeleteComponent],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent implements OnInit {
  apiStatus: any = null;
  dbStatus: any = null;
  loginError: string | null = null;
  loginSuccess = false;
  userData: any = null;
  username = '';
  password = '';

  // Skills management
  skills: any[] = [];
  skillsLoading = false;
  skillsError: string | null = null;
  showSkillCreate = false;
  showSkillEdit = false;
  showSkillDelete = false;
  selectedSkill: any = null;

  // Projects management
  projects: any[] = [];
  projectsLoading = false;
  projectsError: string | null = null;
  showProjectCreate = false;
  showProjectEdit = false;
  showProjectDelete = false;
  selectedProject: any = null;

  constructor(public api: ApiService, private translateService: TranslateService) {
    this.loadSession();
  }

  async ngOnInit() {
    try {
      this.apiStatus = await this.api.getApiStatus();
    } catch (error: any) {
      this.apiStatus = { status: 'API error', error: error?.error?.message || error?.message };
    }

    try {
      this.dbStatus = await this.api.getDbStatus();
    } catch (error: any) {
      this.dbStatus = { status: 'DB error', error: error?.error?.message || error?.message };
    }

    await this.loadSkills();
    await this.loadProjects();
  }

  get currentLanguage(): 'fr' | 'en' {
    return this.translateService.currentLang as 'fr' | 'en' || 'en';
  }

  async loadSkills() {
    this.skillsLoading = true;
    this.skillsError = null;
    try {
      this.skills = await this.api.getSkills();
    } catch (error: any) {
      this.skillsError = error?.error?.message || error?.message || 'Failed to load skills';
    } finally {
      this.skillsLoading = false;
    }
  }

  async loadProjects() {
    this.projectsLoading = true;
    this.projectsError = null;
    try {
      this.projects = await this.api.getProjects(this.currentLanguage);
    } catch (error: any) {
      this.projectsError = error?.error?.message || error?.message || 'Failed to load projects';
    } finally {
      this.projectsLoading = false;
    }
  }

  async login() {
    this.loginError = null;
    try {
      this.userData = await this.api.login(this.username, this.password);
      sessionStorage.setItem('userData', JSON.stringify(this.userData));
      this.loginSuccess = true;
    } catch (error: any) {
      this.loginError = error?.error?.message || error?.message || 'Login failed.';
    }
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.userData = null;
    this.loginSuccess = false;
    this.username = '';
    this.password = '';
  }

  loadSession() {
    const data = sessionStorage.getItem('userData');
    if (data) {
      this.userData = JSON.parse(data);
      this.loginSuccess = true;
    }
  }

  get isLoggedIn(): boolean {
    return this.api.isLoggedIn();
  }

  // Skills management methods
  openCreateSkill() {
    this.showSkillCreate = true;
  }

  openEditSkill(skill: any) {
    this.selectedSkill = skill;
    this.showSkillEdit = true;
  }

  openDeleteSkill(skill: any) {
    this.selectedSkill = skill;
    this.showSkillDelete = true;
  }

  onSkillCreated() {
    this.showSkillCreate = false;
    this.loadSkills();
  }

  onSkillUpdated() {
    this.showSkillEdit = false;
    this.selectedSkill = null;
    this.loadSkills();
  }

  onSkillDeleted() {
    this.showSkillDelete = false;
    this.selectedSkill = null;
    this.loadSkills();
  }

  onSkillPopupClosed() {
    this.showSkillCreate = false;
    this.showSkillEdit = false;
    this.showSkillDelete = false;
    this.selectedSkill = null;
  }

  // Projects management methods
  openCreateProject() {
    this.showProjectCreate = true;
  }

  openEditProject(project: any) {
    this.selectedProject = project;
    this.showProjectEdit = true;
  }

  openDeleteProject(project: any) {
    this.selectedProject = project;
    this.showProjectDelete = true;
  }

  onProjectCreated() {
    this.showProjectCreate = false;
    this.loadProjects();
  }

  onProjectUpdated() {
    this.showProjectEdit = false;
    this.selectedProject = null;
    this.loadProjects();
  }

  onProjectDeleted() {
    this.showProjectDelete = false;
    this.selectedProject = null;
    this.loadProjects();
  }

  onProjectPopupClosed() {
    this.showProjectCreate = false;
    this.showProjectEdit = false;
    this.showProjectDelete = false;
    this.selectedProject = null;
  }
}
