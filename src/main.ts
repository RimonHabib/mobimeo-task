import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SearchModule } from "./search/search.module";

async function bootstrap() {
  // Create express app instance
  const app = await NestFactory.create(SearchModule);

  // Set API prefix and versionc
  app.setGlobalPrefix("api/v1");

  // Set global validator pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Enable CORS
  app.enableCors();

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle("Erasys Password Validator")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  // Get environment variables from configService
  const configService = app.get(ConfigService);
  const port = configService.get<number>("APP_PORT");

  // Fire up the server!
  await app.listen(port);
}
bootstrap();
