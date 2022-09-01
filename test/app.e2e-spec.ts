import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { SearchModule } from "./../src/search/search.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SearchModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/search (GET) Should respond with 400", () => {
    return request(app.getHttpServer()).get("/search").expect(400);
  });

  it("/search (GET) Should respond with 200", () => {
    return request(app.getHttpServer())
      .get("/search")
      .query({ language: "javascript", perPage: 10, page: 1 })
      .expect(200);
  });
});
