import { Routes } from '@angular/router';
import { RequestRelocationComponent } from './request-relocation/request-relocation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/request-relocation', pathMatch: 'full' },
    { path: 'request-relocation', component: RequestRelocationComponent }
];
