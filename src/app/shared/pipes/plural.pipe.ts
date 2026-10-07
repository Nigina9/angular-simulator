import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
  pure: true
})
export class PluralPipe implements PipeTransform {

  transform(quantityUsers: number, firstFormWord: string, secondFormWord: string, thirdFormWord: string): string {
    if (quantityUsers === 1) {
      return `${ quantityUsers } ${ firstFormWord }`;
    } else if (quantityUsers >= 2 && quantityUsers <= 4) {
      return `${ quantityUsers } ${ secondFormWord }`;
    } else {
      return `${ quantityUsers } ${ thirdFormWord }`;
    }
  }

}
