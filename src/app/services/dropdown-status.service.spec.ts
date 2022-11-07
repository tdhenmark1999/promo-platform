import { TestBed } from '@angular/core/testing';

import { DropdownStatusService } from './dropdown-status.service';

describe('DropdownStatusService', () => {
  let service: DropdownStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
