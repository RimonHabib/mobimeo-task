import { Controller, Get } from "@nestjs/common";
import { SearchService } from "../services/search.service";

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchUser() {
    return this.searchService.runSearch();
  }
}
