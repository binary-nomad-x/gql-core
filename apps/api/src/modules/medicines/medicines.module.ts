import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesResolver } from './medicines.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MedicinesService, MedicinesResolver],
  exports: [MedicinesService],
})
export class MedicinesModule {}
