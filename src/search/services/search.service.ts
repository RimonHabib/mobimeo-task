import { Injectable } from "@nestjs/common";
import axios from "axios";
import { SearchResponseDto } from "../dto/searchResponse.dto";
import { UserDto } from "../dto/user.dto";
import { InvalidLanguageException } from "../exceptions/invalid-language.exception";
import {
  ISearchQueryConfig,
  ISearchService,
} from "../interfaces/search.interface";

@Injectable()
export class SearchService implements ISearchService {
  constructor() {}

  /**
   * Method to configure search query with default values
   * @param searchQuery
   * @returns string, Github search query string
   */
  configureSearchQuery(searchQuery: ISearchQueryConfig): string {
    // Constructing search query
    const baseUrl = "https://api.github.com/search/users?";
    const languageQuery = `q=language:${searchQuery.language}`;
    const perPageQuery = `per_page=${searchQuery.perPage}`;
    const pageQuery = `page=${searchQuery.page}`;
    const sortByQuery = `sort=${searchQuery.sortBy}`;
    const orderByQuery = `order=${searchQuery.orderBy}`;
    const searchQueryString = `${baseUrl}${languageQuery}&${perPageQuery}&${pageQuery}&${sortByQuery}&${orderByQuery}`;
    return searchQueryString;
  }

  /**
   * Method to run search query and return users
   * @param searchQuery
   * @returns Promise<UserDto[]>
   * @throws Error if search query fails
   */
  async runSearch(searchQuery: ISearchQueryConfig): Promise<SearchResponseDto> {
    try {
      // Override search query with defaults if not provided
      searchQuery = {
        ...searchQuery,
        ...{
          perPage: 10,
          page: 1,
          sortBy: "followers",
          orderBy: "desc",
        },
      };

      // Configuring search query
      const searchQueryString = this.configureSearchQuery(searchQuery);
      // Running search query and get user list

      const response = await axios.get(searchQueryString, {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      });
      // destructuring response data
      const {
        incomplete_results: isIncompleteResults,
        total_count: totalCount,
        items: users,
      } = response.data;

      // If incomplete results, throw error
      if (isIncompleteResults) {
        throw new InvalidLanguageException(
          `${searchQuery.language} is not a valid language`
        );
      }

      // List of users whos profiles to be fetched,
      const toBeFectchedProfiles = users.map((user) => {
        return axios.get(user.url, {
          headers: {
            Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          },
        });
      });

      // Fetching profiles of users
      const fetchedProfiles = await Promise.all(toBeFectchedProfiles);
      // mapping fetched profiles to user dto
      const profiles = fetchedProfiles
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

      // Return search response
      return {
        users: profiles,
        totalCount,
        count: profiles.length,
        page: searchQuery.page,
      };
    } catch (error) {
      // Throw error if search query fails
      console.log(error);
      throw error;
    }
  }
}
