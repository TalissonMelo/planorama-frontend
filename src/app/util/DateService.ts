import { format, toZonedTime } from 'date-fns-tz';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatDateTime(time: number[]) {
    // Extraindo hora e minuto do array
    const [hour, minute] = time;

    // Obter o fuso horário local
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Criar um objeto de data para o horário local
    const localDateTime = new Date();
    localDateTime.setHours(hour, minute, 0, 0); // Definindo a hora e os minutos

    // Converter para o fuso horário especificado
    const zonedDateTime = toZonedTime(localDateTime, timezone);

    // Formatar a data para o formato desejado
    const formattedDate = format(zonedDateTime, 'yyyy-MM-dd HH:mm:ssXXX', {
      timeZone: timezone,
    });

    return formattedDate;
  }

  convertTimeToArray(time: string): [number, number, string] {
    const [hour, minute] = time.split(':').map(Number);
    return [hour, minute, '-03:00'];
  }
}
