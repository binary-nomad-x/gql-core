import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MedicinesService } from './medicines.service';
import { Medicine } from './models/medicine.model';
import { CreateMedicineInput } from './dto/create-medicine.input';

@Resolver(() => Medicine)
export class MedicinesResolver {
    constructor(private readonly medicinesService: MedicinesService) { }

    @Query(() => [Medicine], { name: 'medicines' })
    findAll() {
        return this.medicinesService.findAll();
    }

    @Query(() => Medicine, { name: 'medicine' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.medicinesService.findOne(id);
    }

    @Mutation(() => Medicine)
    createMedicine(@Args('createMedicineInput') createMedicineInput: CreateMedicineInput) {
        return this.medicinesService.create(createMedicineInput);
    }
}
