import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'serviceFilter'
})

export class ServiceFilterPipe implements PipeTransform {
    transform(list: any[], value: string) {
        return value ? list.filter(item => item.service === value) : list;
    }
}