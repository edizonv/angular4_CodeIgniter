import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setStatus'
})
export class SetStatusPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1) {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }

}
