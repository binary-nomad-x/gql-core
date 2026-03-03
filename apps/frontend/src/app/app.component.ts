import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="max-width: 800px; margin: 0 auto;">
      <h1>Hospital Management System (Monorepo)</h1>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  title = 'frontend';
}
