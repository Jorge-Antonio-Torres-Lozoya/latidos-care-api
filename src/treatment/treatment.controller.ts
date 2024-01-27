import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { Treatment } from './treatment.entity';
import { CreateTreatmentDto } from './dtos/create-treatment.dto';
//import { client } from '../main';
import { Serialize } from '../interceptors/serialize.interceptor';
import { TreatmentDto } from './dtos/treatment.dto';
import { AnyQueryAuthGuard } from '../guards/any-query.guard';

@Controller('treatment')
export class TreatmentController {
  constructor(private treatmentService: TreatmentService) {}
  @Serialize(TreatmentDto)
  @UseGuards(AnyQueryAuthGuard)
  @Get('between-dates')
  async getTreatmentsBetweenDates(
    @Query('medicationId') medicationId: string,
    @Query('startDate') startDateString: string,
    @Query('endDate') endDateString: string,
  ) {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return await this.treatmentService.newGetTreatmentsBetweenDates(
      parseInt(medicationId),
      startDate,
      endDate,
    );
  }

  @UseGuards(AnyQueryAuthGuard)
  @Serialize(TreatmentDto)
  @Get()
  async findAllTreatments(): Promise<Treatment[]> {
    return await this.treatmentService.getAll();
  }

  @UseGuards(AnyQueryAuthGuard)
  @Serialize(TreatmentDto)
  @Get('/:id')
  async findTreatmentById(
    @Param('id') treatmentId: string,
  ): Promise<Treatment> {
    return await this.treatmentService.getById(parseInt(treatmentId));
  }

  @UseGuards(AnyQueryAuthGuard)
  @Serialize(TreatmentDto)
  @Post()
  async createTreatment(@Body() body: CreateTreatmentDto): Promise<Treatment> {
    const treatment = await this.treatmentService.create(body);
    /*client.messages
      .create({
        from: 'whatsapp:+51980159005',
        body: `Hola ${treatment.medication.user.firstName}  ${treatment.medication.user.lastName}, es hora de tomar tu medicina ${treatment.medication.medicationName}
    correspondiente a tu tratamiento relacionado con ${treatment.medication.trackingValue.trackingValueName}. Por favor ingresar al 
    siguiente enlace para confirmar si tomo su medicamento:
    <a href="http://localhost:4200/updated-treatment/${treatment.medication.medicationId}">
      https://www.latidoscare.com
    </a>`,
        to: `whatsapp: ${treatment.medication.user.phoneNumber}`,
      })
      .then((message) => console.log(message.sid));*/

    return treatment;
  }

  @UseGuards(AnyQueryAuthGuard)
  @Serialize(TreatmentDto)
  @Get('by-medication')
  async findTreatmentByMedication(
    @Query('medicationId') medicationId: string,
  ): Promise<Treatment[]> {
    return await this.treatmentService.getByMedication(parseInt(medicationId));
  }
}
