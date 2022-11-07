import { Injectable, NgModule } from '@angular/core';
import { ServiceFilterPipe } from './service-filter.pipe';
import { StatusFilterPipe } from './status-filter.pipe';

const PIPES = [
    ServiceFilterPipe,
    StatusFilterPipe
]

@Injectable()
@NgModule({
    imports:        [],
    declarations:   [PIPES],
    exports:        [PIPES],
})

export class PipeModule {

    static forRoot() {
       return {
           ngModule: PipeModule,
           providers: [],
       };
    }
  }
