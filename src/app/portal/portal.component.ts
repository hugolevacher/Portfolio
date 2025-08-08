import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portal',
  imports: [CommonModule, RouterModule, TranslateModule, FormsModule],
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

  constructor(private api: ApiService) {
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
}
