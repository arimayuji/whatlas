import { AppError } from "./app-error";

export class EntityNotExistsError extends AppError{
  constructor( entityType: 'linhas_metro' | 'linhas_onibus' | 'linhas_trem' | 'terminal_onibus') {
    let message = `Entity ${entityType} not exists`;

    switch (entityType) {
      case 'linhas_metro':
        message = 'Subway line not exists';
        break;
      case 'linhas_onibus':
        message = 'Bus line not exists';
        break;
      case 'linhas_trem':
        message = 'Train line not exists';
        break;
      case 'terminal_onibus':
        message = 'Bus terminal not exists';
        break;
    }

    super(message, 404);
  }
}