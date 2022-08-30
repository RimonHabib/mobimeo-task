export interface ISearchService {
  configureSearchQuery(searchQuery: ISearchQueryConfig): string;
  runSearch();
}

export interface ISearchQueryConfig {
  language: string;
  perPage: number;
  page: number;
}
