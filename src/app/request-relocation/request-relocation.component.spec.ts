import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRelocationComponent } from './request-relocation.component';

describe('RequestRelocationComponent', () => {
  let component: RequestRelocationComponent;
  let fixture: ComponentFixture<RequestRelocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestRelocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestRelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
