import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserDto } from "./user.dto";

export class SearchResponseDto {
  @Expose()
  @ApiProperty({ type: [UserDto] })
  users: UserDto[];

  @Expose()
  @ApiProperty({
    description: "Total number of records found",
    example: 3453,
  })
  totalCount: number;

  @Expose()
  @ApiProperty({
    description: "number of results in the resoponse",
    example: 10,
  })
  count: number;

  @Expose()
  @ApiProperty({ description: "Page number", example: 1, default: 1 })
  page: number;
}
