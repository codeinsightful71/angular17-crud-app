import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit = false;
  employeeId: string | null = null;

  // Dependency Injection
  fb = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = id;
        this.employeeService.getEmployee(this.employeeId).subscribe((data) => {
          this.employeeForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    if (this.isEdit && this.employeeId) {
      // Edit Employee
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      // Create Employee
      this.employeeService
        .createEmployee(this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
