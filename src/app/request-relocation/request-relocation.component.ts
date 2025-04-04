import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { DateAdapter, provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { RelocationRequestBackendService } from '../shared/relocation-request-backend.service';

@Component({
  selector: 'app-request-relocation',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'}
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './request-relocation.component.html',
  styleUrl: './request-relocation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestRelocationComponent implements OnInit {
  private readonly _adapter = inject<DateAdapter<unknown, unknown>>(DateAdapter);
  private readonly _intl = inject(MatDatepickerIntl);
  private readonly _locale = signal(inject<unknown>(MAT_DATE_LOCALE));
  public formGroup!: FormGroup;
  public isShowPositiveRequest = false;
  public isShowNegativeRequest = false;

  constructor(public formBuilder: FormBuilder, private backendService: RelocationRequestBackendService) {
    this._locale.set('en-US');
    this._adapter.setLocale(this._locale());
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      clientName: ['', [Validators.required]],
      relocationDate: [new Date(), [Validators.required]],
      fromCity: ['', [Validators.required]],
      fromZip: [0, [Validators.required, Validators.pattern("[0-9]+")]],
      fromStreet: ['', [Validators.required]],
      fromFloor: [0, [Validators.required, Validators.pattern("[0-9]+")]],
      fromElevator: [false, [Validators.required]],
      toCity: ['', [Validators.required]],
      toZip: [0, [Validators.required, Validators.pattern("[0-9]+")]],
      toStreet: ['', [Validators.required]],
      toFloor: [0, [Validators.required, Validators.pattern("[0-9]+")]],
      toElevator: [false, [Validators.required]],
      packagingService: [false, [Validators.required]],
    });

    this.updatePicker();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.backendService.sendRelocationRequest(this.formGroup.value).subscribe((result) => {
        if (result) {
          this.reset();
          this.isShowPositiveRequest = true;
        } else {
          this.reset();
          this.isShowNegativeRequest = true;
        }
      });
    }
  }

  abortClicked() {
    this.reset();
  }

  reset(): void {
    this.formGroup.reset({
      clientName: '',
      relocationDate: new Date(),
      fromCity: '',
      fromZip: 0,
      fromStreet: '',
      fromFloor: 0,
      fromElevator: false,
      toCity: '',
      toZip: 0,
      toStreet: '',
      toFloor: 0,
      toElevator: false,
      packagingService: false
    });

    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsPristine();
      control.markAsUntouched();
    });
    
    this.isShowPositiveRequest = false;
    this.isShowNegativeRequest = false;
  }

  updatePicker(): void {
    this._intl.changes.next();
  }
}
