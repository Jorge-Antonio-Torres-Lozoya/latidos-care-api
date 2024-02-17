import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
import { TreatmentModule } from './treatment/treatment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DBOptions } from 'db.datasourceoptions';
import { APP_PIPE } from '@nestjs/core';
import { CurrentValueModule } from './current-value/current-value.module';
import { TrackingValueModule } from './tracking-value/tracking-value.module';
import { SicknessModule } from './sickness/sickness.module';
import { AllergyModule } from './allergy/allergy.module';
import { SendgridService } from 'sendgrid.service';
import { UserTrackingValueModule } from './user-tracking-value/user-tracking-value.module';
import { UserSicknessModule } from './user-sickness/user-sickness.module';
import { MedicationSicknessModule } from './medication-sickness/medication-sickness.module';
import { UserAllergyModule } from './user-allergy/user-allergy.module';
import { AccountModule } from './account/account.module';
import { RoleModule } from './role/role.module';
import { RoleAccountModule } from './role-account/role-account.module';
import { DataAccessConsentModule } from './data-access-consent/data-access-consent.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      //inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (config: ConfigService) => {
        const dbOptions: TypeOrmModuleOptions = {};

        Object.assign(dbOptions, DBOptions);

        return dbOptions;
      },
    }),
    TrackingValueModule,
    MedicationModule,
    TreatmentModule,
    CurrentValueModule,
    SicknessModule,
    AllergyModule,
    UserTrackingValueModule,
    UserSicknessModule,
    MedicationSicknessModule,
    UserAllergyModule,
    AccountModule,
    RoleModule,
    RoleAccountModule,
    DataAccessConsentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    SendgridService,
  ],
})
export class AppModule {}
