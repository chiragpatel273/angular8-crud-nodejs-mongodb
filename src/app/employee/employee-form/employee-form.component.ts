import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  departments = [
    { Id: 1, Name: 'IT' },
    { Id: 2, Name: 'COMP' }
  ]

  countries = [
    { Id: 1, Name: 'India' },
    { Id: 2, Name: 'USA' }
  ]
  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, 
  private fb: FormBuilder,private employeeService:EmployeeService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['abcd', [Validators.required]],
      lastName: ['defd', [Validators.required]],
      email: ['abc@c.com', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      salary: ['5000', [Validators.required]],
      department: [1, [Validators.required]],
      country: [2, [Validators.required]]
    })
  }

  onSubmit() {
    this.employeeForm.patchValue({
      dateOfBirth: this.employeeForm.value.dateOfBirth.toISOString()
    })
    console.log(this.employeeForm.value);
    this.employeeService.addEmployee(this.employeeForm.value).subscribe((data) => {
      console.log(data);
      this.dialogRef.close();
    })
  }

}
