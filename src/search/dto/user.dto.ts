import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserDto {
  @Expose()
  @ApiProperty({ description: "user's github username", example: "RimonHabib" })
  username: string;

  @Expose()
  @ApiProperty({ description: "user's fullname", example: "Rimon Habib" })
  name: string;

  @Expose()
  @ApiProperty({
    description: "user's avatar url",
    example: "https://avatars3.githubusercontent.com/u/17098?v=4",
  })
  avatarUrl: string;

  @Expose()
  @ApiProperty({ description: "number of followers", example: 100 })
  followers: number;
}
