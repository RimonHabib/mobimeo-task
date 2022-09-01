import { BadRequestException } from "@nestjs/common";

/**
 * InvalidLanguageException is thrown when the user input
 * programming language not valid.
 */

export class InvalidLanguageException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
