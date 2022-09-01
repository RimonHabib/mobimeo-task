import { UserDto } from "../dto/user.dto";

// Search service interface
export interface ISearchService {
  configureSearchQuery(searchQuery: ISearchQueryConfig): string;
  runSearch(searchQuery: ISearchQueryConfig);
}

// Search query config interface
export interface ISearchQueryConfig {
  language: string;
  perPage?: number;
  page?: number;
  sortBy?: "followers" | "repositories" | "joined";
  orderBy?: "asc" | "desc";
}
