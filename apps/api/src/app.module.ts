import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Local Files
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

// Existing Modules
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [AppService, AppResolver], // necessary things to make it work
})
export class AppModule {}
