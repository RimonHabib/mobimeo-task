import { UserDto } from "../dto/user.dto";

export interface ISearchService {
  configureSearchQuery(searchQuery: ISearchQueryConfig): string;
  runSearch(): Promise<UserDto>;
}

export interface ISearchQueryConfig {
  language: string;
  perPage?: number;
  page?: number;
  sortBy?: "followers" | "repositories" | "joined";
  orderBy?: "asc" | "desc";
}
