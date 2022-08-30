import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { UserModule } from "./user/user.module";

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  // Set API prefix and versionc
  app.setGlobalPrefix("api/v1");

  // Enable CORS
  app.enableCors();

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle("Erasys Password Validator")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  // Get environment variables from configService
  const configService = app.get(ConfigService);
  const port = configService.get<number>("APP_PORT");
  await app.listen(port);
}
bootstrap();
