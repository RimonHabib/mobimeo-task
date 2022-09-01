import { Test, TestingModule } from "@nestjs/testing";
import { SearchService } from "../services/search.service";
import { SearchController } from "./search.controller";

describe("UserController", () => {
  let searchController: SearchController;
  const mockSearchService = {
    runSearch: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [{ provide: SearchService, useValue: mockSearchService }],
    }).compile();

    searchController = app.get<SearchController>(SearchController);
  });

  it("should be defined", () => {
    expect(searchController).toBeDefined();
  });

  describe("runSearch", () => {
    it("should call runSearch on the service", async () => {
      const query = { language: "javascript", perPage: 10, page: 1 };
      await searchController.searchUser(query);
      expect(mockSearchService.runSearch).toHaveBeenCalled();
    });
  });
});
