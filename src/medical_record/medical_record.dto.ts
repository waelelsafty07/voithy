import { IsOptional, IsString, IsMongoId, ValidateIf } from 'class-validator';

class CreateMedicalRecordDto {


  @IsMongoId()
  public patient: string;


  @IsMongoId()
  public doctor: string;

  @IsString()
  public note: string;

  @IsString()
  public treatment: string;

  @IsString()
  public date: string;
}

export default CreateMedicalRecordDto;