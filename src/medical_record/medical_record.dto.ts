import { IsOptional, IsString, ValidateNested, ValidateIf } from 'class-validator';

class CreateMedicalRecordDto {


  @IsString()
  public patient: string;


  @IsString()
  public doctor: string;

  @IsString()
  public note: string;

  @IsString()
  public treatment: string;

  @IsString()
  public date: string;
}

export default CreateMedicalRecordDto;