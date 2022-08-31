import { Injectable } from "@nestjs/common";
import axios from "axios";
import { UserDto } from "../dto/user.dto";
import {
  ISearchQueryConfig,
  ISearchService,
} from "../interfaces/search.interface";

@Injectable()
export class SearchService implements ISearchService {
  constructor() {}

  configureSearchQuery(searchQuery: ISearchQueryConfig): string {
    // Constructing search query
    const baseUrl = "https://api.github.com/search/users?";
    const languageQuery = `q=language:${searchQuery.language || "typescript"}`;
    const perPageQuery = `per_page=${searchQuery.perPage || 10}`;
    const pageQuery = `page=${searchQuery.page || 1}`;
    const sortByQuery = `sort=${searchQuery.sortBy || "followers"}`;
    const orderByQuery = `order=${searchQuery.orderBy || "desc"}`;
    const searchQueryString = `${baseUrl}${languageQuery}&${perPageQuery}&${pageQuery}&${sortByQuery}&${orderByQuery}`;
    return searchQueryString;
  }

  async runSearch(): Promise<UserDto[]> {
    try {
      const searchQuery: ISearchQueryConfig = {
        language: "typescript",
        perPage: 10,
        page: 1,
      };

      const users = await axios.get(this.configureSearchQuery(searchQuery));
      const toBeFectchedUsers = users.data.items.map((user) => {
        return axios.get(user.url);
      });

      const fetchedProfiles = await Promise.all(toBeFectchedUsers);
      return fetchedProfiles
        .map((profile) => {
          return profile.data;
        })
        .map((user) => {
          return {
            username: user.login,
            name: user.name,
            avatarUrl: user.avatar_url,
            followers: user.followers,
          };
        });
    } catch (error) {
      console.log(error);
    }
  }
}
