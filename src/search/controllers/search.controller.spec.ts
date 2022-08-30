import { Test, TestingModule } from "@nestjs/testing";
import { SearchService } from "../services/search.service";
import { SearchController } from "./search.controller";

describe("UserController", () => {
  let searchController: SearchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    searchController = app.get<SearchController>(SearchController);
  });

  // describe("root", () => {
  //   it('should return "Hello World!"', () => {
  //     expect(searchController.getHello()).toBe("Hello World!");
  //   });
  // });
});
