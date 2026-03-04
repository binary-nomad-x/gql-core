import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Localhost:4201/
  { path: 'profile', component: ProfileComponent }, // Localhost:4201/profile
  { path: '**', redirectTo: '' }, // 404 handling
];
