import { Expose } from 'class-transformer';

export class TreatmentDto {
  @Expose()
  taken: boolean;

  @Expose()
  createdAt: Date;
}
