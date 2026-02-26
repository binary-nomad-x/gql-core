import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
}

const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
      id
      name
      specialty
    }
  }
`;

const CREATE_DOCTOR = gql`
  mutation CreateDoctor($name: String!, $specialty: String!) {
    createDoctor(createDoctorInput: { name: $name, specialty: $specialty }) {
      id
      name
      specialty
    }
  }
`;

@Injectable({
    providedIn: 'root',
})
export class DoctorsService {
    constructor(private apollo: Apollo) { }

    getDoctors(): Observable<Doctor[]> {
        return this.apollo
            .watchQuery<{ doctors: Doctor[] }>({
                query: GET_DOCTORS,
            })
            .valueChanges.pipe(map((result) => result.data.doctors));
    }

    createDoctor(name: string, specialty: string): Observable<Doctor> {
        return this.apollo
            .mutate<{ createDoctor: Doctor }>({
                mutation: CREATE_DOCTOR,
                variables: { name, specialty },
                refetchQueries: [{ query: GET_DOCTORS }],
            })
            .pipe(map((result) => result.data!.createDoctor));
    }
}
