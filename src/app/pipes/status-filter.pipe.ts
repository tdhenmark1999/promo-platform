import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'statusFilter'
})

export class StatusFilterPipe implements PipeTransform {
    transform(list: any[], value: string) {
        return value ? list.filter(item => item.status === value) : list;
    }
}