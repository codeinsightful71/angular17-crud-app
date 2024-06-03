import { Component, OnInit, inject } from '@angular/core';
import { employee } from '../models/employee.interface';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employeeService = inject(EmployeeService);
  router = inject(Router);
  employees: employee[] = [];

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .subscribe((data) => (this.employees = data));
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  editEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employees = this.employees.filter((emp) => emp.id !== id);
      });
    }
  }
}
