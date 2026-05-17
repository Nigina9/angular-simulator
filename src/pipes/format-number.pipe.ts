import { Pipe, PipeTransform } from '@angular/core';
import { Format } from '../enums/Format';

@Pipe({
  name: 'formatNumber',
  standalone: true
})
export class FormatNumberPipe implements PipeTransform {

  transform(phoneNumber: string, formattingMode: Format): string {
    const cleanNumber: string[] = phoneNumber.replace(/\D/g, '').split('');
    switch (formattingMode) {
      case Format.COMPACT:
        return '+' + cleanNumber.join('');
      case Format.INTERNATIONAL: {
        const countryCode: string[] = cleanNumber.slice(0, 2);
        const operatorCode: string[] = cleanNumber.slice(2, 5);
        const firstPart: string[] = cleanNumber.slice(5, 8);
        const secondPart: string[] = cleanNumber.slice(8, 10);
        const thirdPart: string[] = cleanNumber.slice(10, 12);
        const groups: string[] = [countryCode, operatorCode, firstPart, secondPart, thirdPart].map((group: string[]) => group.join(''));
        return '+' + groups.join(' ');
      }
      case Format.NATIONAL: {
        const operatorCode: string[] = cleanNumber.slice(2, 5);
        const firstPart: string[] = cleanNumber.slice(5, 8);
        const secondPart: string[] = cleanNumber.slice(8, 10);
        const thirdPart: string[] = cleanNumber.slice(10, 12);
        const groups: string[] = [operatorCode, firstPart, secondPart, thirdPart].map((group: string[]) => group.join(''));
        return groups.join(' ');
      }
      case Format.MASKED: {
        const countryCode: string[] = cleanNumber.slice(0, 2);
        const operatorCode: string[] = cleanNumber.slice(2, 5);
        const thirdPart: string[] = cleanNumber.slice(10, 12);
        const groups: string[] = [countryCode.join(''), operatorCode.join(''), '***', '**', thirdPart.join('')];
        return '+' + groups.join(' ');
      }
      default: return phoneNumber;
    }
  }

}
