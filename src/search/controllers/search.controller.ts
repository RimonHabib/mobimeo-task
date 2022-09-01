import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SearchRequestDto } from "../dto/searchRequest.dto";
import { SearchResponseDto } from "../dto/searchResponse.dto";
import { SearchService } from "../services/search.service";

/**
 * SearchController contains single endpoint for searching users
 * from github based on programming language
 */

@Controller("search")
export class SearchController {
  // Inject searchService
  constructor(private readonly searchService: SearchService) {}

  // Endpoint definition
  @Get()

  // serializer interceptor
  @UseInterceptors(ClassSerializerInterceptor)

  // Endpoint documentation
  @ApiOperation({
    summary: "Search and get users from github based on programming language.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SearchResponseDto,
  })
  async searchUser(
    @Query() query: SearchRequestDto
  ): Promise<SearchResponseDto> {
    try {
      // get query params
      const { language, perPage, page } = query;

      // run search query
      return await this.searchService.runSearch({
        language,
        perPage,
        page,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
