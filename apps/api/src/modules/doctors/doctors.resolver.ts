import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { Doctor } from './models/doctor.model';
import { CreateDoctorInput } from './dto/create-doctor.input';

@Resolver(() => Doctor)
export class DoctorsResolver {
    constructor(private readonly doctorsService: DoctorsService) { }

    @Query(() => [Doctor], { name: 'doctors' })
    findAll() {
        return this.doctorsService.findAll();
    }

    @Query(() => Doctor, { name: 'doctor' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.doctorsService.findOne(id);
    }

    @Mutation(() => Doctor)
    createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
        return this.doctorsService.create(createDoctorInput);
    }
}
