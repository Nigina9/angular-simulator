import { Pipe, PipeTransform } from '@angular/core';
import { PhoneFormat } from '../enums/Format';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phoneNumber: string, formattingMode: PhoneFormat): string {
    const cleanNumber: string[] = phoneNumber.replace(/\D/g, '').split('');
    const countryCode: string[] = cleanNumber.slice(0, 2);
    const operatorCode: string[] = cleanNumber.slice(2, 5);
    const firstPart: string[] = cleanNumber.slice(5, 8);
    const secondPart: string[] = cleanNumber.slice(8, 10);
    const thirdPart: string[] = cleanNumber.slice(10, 12);

    switch (formattingMode) {
      case PhoneFormat.COMPACT:
        return '+' + cleanNumber.join('');
      case PhoneFormat.INTERNATIONAL: {
        const groups: string[] = [countryCode, operatorCode, firstPart, secondPart, thirdPart].map((group: string[]) => group.join(''));
        return '+' + groups.join(' ');
      }
      case PhoneFormat.NATIONAL: {
        const groups: string[] = [operatorCode, firstPart, secondPart, thirdPart].map((group: string[]) => group.join(''));
        return groups.join(' ');
      }
      case PhoneFormat.MASKED: {
        const groups: string[] = [countryCode.join(''), operatorCode.join(''), '***', '**', thirdPart.join('')];
        return '+' + groups.join(' ');
      }
      default: return phoneNumber;
    }
  }

}
