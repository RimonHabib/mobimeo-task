import { Injectable } from "@nestjs/common";
import axios from "axios";
import {
  ISearchQueryConfig,
  ISearchService,
} from "../interfaces/search.interface";

@Injectable()
export class SearchService implements ISearchService {
  constructor() {}

  configureSearchQuery(searchQuery: ISearchQueryConfig): string {
    return `${searchQuery.language}&per_page=${searchQuery.perPage}&page=${searchQuery.page}`;
  }

  runSearch() {}
}
