import { Controller, Get, Query } from "@nestjs/common";
import { SearchRequestDto } from "../dto/searchRequest.dto";
import { SearchService } from "../services/search.service";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchUser(@Query() query: SearchRequestDto) {
    return this.searchService.runSearch();
  }
}
