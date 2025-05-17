import { Component } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent], // ✅ Make sure it's imported here
  template: `<app-employee></app-employee>`,
})
export class AppComponent {}
