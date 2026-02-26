import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoctorsComponent],
  template: `
    <div style="max-width: 800px; margin: 0 auto;">
      <h1>Hospital Management System (Monorepo)</h1>
      <app-doctors></app-doctors>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'frontend';
}
