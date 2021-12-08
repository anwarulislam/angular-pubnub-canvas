import { Pipe, PipeTransform } from '@angular/core';
import Icon from '../components/icons';

@Pipe({
  name: 'fasIcon'
})
export class FasIconPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return Icon[value];
  }

}
