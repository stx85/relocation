import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RequestRelocationComponent } from './request-relocation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RelocationRequestBackendService } from '../shared/relocation-request-backend.service';
import { of } from 'rxjs';

describe('RequestRelocationComponent', () => {
  let component: RequestRelocationComponent;
  let fixture: ComponentFixture<RequestRelocationComponent>;
  let mockBackendService: jasmine.SpyObj<RelocationRequestBackendService>;

  beforeEach(async () => {
    mockBackendService = jasmine.createSpyObj('RelocationRequestBackendService', ['sendRelocationRequest']);

    await TestBed.configureTestingModule({
      imports: [
        RequestRelocationComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [{ provide: RelocationRequestBackendService, useValue: mockBackendService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestRelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    const controls = [
      'clientName',
      'relocationDate',
      'fromCity',
      'fromZip',
      'fromStreet',
      'fromFloor',
      'fromElevator',
      'toCity',
      'toZip',
      'toStreet',
      'toFloor',
      'toElevator',
      'packagingService',
    ];

    controls.forEach(control => {
      expect(component.formGroup.contains(control)).toBeTrue();
    });
  });

  it('should disable send button with invalid form', () => {
    const sendButton: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="sendbutton"]');
    expect(sendButton.disabled).toBeTrue();
  });

  it('should enable abort button', () => {
    const abortButton: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="abortbutton"]');
    expect(abortButton.disabled).toBeFalse();
  });

  it('should enable send button with valid form', () => {
    component.formGroup.patchValue({
      clientName: 'Max Huber',
      relocationDate: new Date(),
      fromCity: 'Siegendorf',
      fromZip: '7011',
      fromStreet: 'Technologiestr. 1',
      fromFloor: '1',
      fromElevator: true,
      toCity: 'Wien',
      toZip: '1010',
      toStreet: 'Ringstrasse 2',
      toFloor: '1',
      toElevator: false,
      packagingService: true,
    });

    fixture.detectChanges();

    const sendButton: HTMLButtonElement = fixture.nativeElement.querySelector('[data-testid="sendbutton"]');
    expect(sendButton.disabled).toBeFalse();
  });

  it('should call onSubmit() when send request button is clicked', fakeAsync(() => {
    mockBackendService.sendRelocationRequest.and.returnValue(of(true));
    spyOn(component, 'onSubmit');

    component.formGroup.patchValue({
      clientName: 'Max Huber',
      relocationDate: new Date(),
      fromCity: 'Siegendorf',
      fromZip: 7011,
      fromStreet: 'Technologiestr. 1',
      fromFloor: 1,
      fromElevator: true,
      toCity: 'Wien',
      toZip: 1010,
      toStreet: 'Ringstrasse 2',
      toFloor: 1,
      toElevator: false,
      packagingService: true,
    });

    fixture.detectChanges();

    const sendRequestButton = fixture.nativeElement.querySelector('[data-testid="sendbutton"]');
    sendRequestButton.click();

    tick();
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should show success message after submit and positive response', () => {
    mockBackendService.sendRelocationRequest.and.returnValue(of(true));

    component.formGroup.patchValue({
      clientName: 'Max Huber',
      relocationDate: new Date(),
      fromCity: 'Siegendorf',
      fromZip: 7011,
      fromStreet: 'Technologiestr. 1',
      fromFloor: 1,
      fromElevator: true,
      toCity: 'Wien',
      toZip: 1010,
      toStreet: 'Ringstrasse 2',
      toFloor: 1,
      toElevator: false,
      packagingService: true,
    });

    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const positivemessage = fixture.nativeElement.querySelector('[data-testid="positiverequestmessage"]');
    expect(positivemessage).toBeTruthy();

    const negativemessage = fixture.nativeElement.querySelector('[data-testid="negativerequestmessage"]');
    expect(negativemessage).not.toBeTruthy();
  });

  it('should show error message after submit and negative response', () => {
    mockBackendService.sendRelocationRequest.and.returnValue(of(false));

    component.formGroup.patchValue({
      clientName: 'Max Huber',
      relocationDate: new Date(),
      fromCity: 'Siegendorf',
      fromZip: 7011,
      fromStreet: 'Technologiestr. 1',
      fromFloor: 1,
      fromElevator: true,
      toCity: 'Wien',
      toZip: 1010,
      toStreet: 'Ringstrasse 2',
      toFloor: 1,
      toElevator: false,
      packagingService: true,
    });

    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const positivemessage = fixture.nativeElement.querySelector('[data-testid="positiverequestmessage"]');
    expect(positivemessage).not.toBeTruthy();

    const negativemessage = fixture.nativeElement.querySelector('[data-testid="negativerequestmessage"]');
    expect(negativemessage).toBeTruthy();
  });

  it('should call abortClicked() when abort button is clicked', () => {
    spyOn(component, 'abortClicked');
    const abortButton = fixture.debugElement.query(By.css('[data-testid="abortbutton"]')).nativeElement;
    abortButton.click();
    expect(component.abortClicked).toHaveBeenCalled();
  });
});
