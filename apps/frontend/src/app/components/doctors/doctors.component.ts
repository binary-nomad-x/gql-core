import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorsService, Doctor } from '../../services/doctors.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-doctors',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="doctors-container">
      <h2>Doctors</h2>
      <div class="add-doctor">
        <input [(ngModel)]="newName" placeholder="Name" />
        <input [(ngModel)]="newSpecialty" placeholder="Specialty" />
        <button (click)="addDoctor()">Add Doctor</button>
      </div>

      <ul class="doctor-list">
        <li *ngFor="let doctor of doctors$ | async" class="doctor-item">
          <strong>{{ doctor.name }}</strong> - {{ doctor.specialty }}
        </li>
      </ul>
    </div>
  `,
    styles: [`
    .doctors-container { padding: 20px; font-family: sans-serif; }
    .add-doctor { margin-bottom: 20px; }
    .add-doctor input { margin-right: 10px; padding: 5px; }
    .doctor-list { list-style: none; padding: 0; }
    .doctor-item { padding: 10px; border-bottom: 1px solid #eee; }
  `]
})
export class DoctorsComponent implements OnInit {
    doctors$!: Observable<Doctor[]>;
    newName = '';
    newSpecialty = '';

    constructor(private doctorsService: DoctorsService) { }

    ngOnInit(): void {
        this.doctors$ = this.doctorsService.getDoctors();
    }

    addDoctor(): void {
        if (this.newName && this.newSpecialty) {
            this.doctorsService.createDoctor(this.newName, this.newSpecialty).subscribe(() => {
                this.newName = '';
                this.newSpecialty = '';
            });
        }
    }
}
