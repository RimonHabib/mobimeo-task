import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchRequestDto {
  @Expose()
  @ApiProperty({
    required: true,
    description: "Programming language to search",
    example: "typescript",
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @Expose()
  @ApiPropertyOptional({
    description: "Number of results per page",
    example: 30,
    default: 10,
  })
  perPage?: number;

  @Expose()
  @ApiPropertyOptional({ description: "Page number", example: 1, default: 1 })
  page: number;
}
