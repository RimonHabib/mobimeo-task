import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SearchController } from "./controllers/search.controller";
import { SearchService } from "./services/search.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
