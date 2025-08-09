import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { PortalComponent } from './portal/portal.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: 'project/:projectName', component: ProjectComponent },
    { path: 'hub', component: PortalComponent }
];
