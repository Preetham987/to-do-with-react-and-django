import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  employee = {
    name: '',
    department: '',
    role: '',
    salary: null
  };
  employees: any[] = [];
  message = '';
  filter = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  submitEmployee() {
    const url = 'http://127.0.0.1:8000/api/employees/';
    this.http.post(url, this.employee).subscribe({
      next: () => {
        this.message = 'Employee added!';
        this.employee = { name: '', department: '', role: '', salary: null };
        this.getEmployees();
      },
      error: () => {
        this.message = 'Failed to add employee.';
      }
    });
  }

  getEmployees() {
    const url = 'http://127.0.0.1:8000/api/employees/';
    this.http.get<any[]>(url).subscribe(data => this.employees = data);
  }

  deleteEmployee(id: number) {
    const url = `http://127.0.0.1:8000/api/employees/${id}/`;
    this.http.delete(url).subscribe(() => this.getEmployees());
  }

  filteredEmployees() {
    return this.employees.filter(e =>
      e.department.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
