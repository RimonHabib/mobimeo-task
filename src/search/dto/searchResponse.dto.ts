import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserDto } from "./user.dto";

export class SearchResponseDto {
  @Expose()
  users: UserDto;

  @Expose()
  @ApiProperty({
    description: "number of results per page",
    example: 30,
    default: 10,
  })
  totalCount: number;

  @Expose()
  @ApiProperty({ description: "Page number", example: 1, default: 1 })
  page: number;
}
