import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchRequestDto {
  @Expose()
  @ApiProperty({
    required: true,
    description: "Programming language to search",
    example: "TypeScript",
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @Expose()
  @ApiProperty({
    description: "Number of results per page",
    example: 30,
    default: 10,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @Expose()
  @ApiProperty({
    description: "Page number",
    example: 1,
    default: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
