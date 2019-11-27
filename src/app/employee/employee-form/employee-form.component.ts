import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  btnLabel;
  departments = [
    { Id: 'IT', Name: 'IT' },
    { Id: 'COMP', Name: 'COMP' }
  ]

  countries = [
    { Id: 'India', Name: 'India' },
    { Id: 'USA', Name: 'USA' }
  ]
  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private employeeService: EmployeeService, private _snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    console.log(this.data);
    this.btnLabel = this.data.action;



    if (this.data.action == 'Update') {

      this.employeeForm = this.fb.group({
        _id:[''],
        firstName: [''],
        lastName: [''],
        email: [''],
        dateOfBirth: [''],
        salary: [''],
        department: [''],
        country: ['']
      })

      this.employeeForm.patchValue({
        _id:this.data._id,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        email: this.data.email,
        dateOfBirth: new Date(this.data.dateOfBirth),
        salary: this.data.salary,
        department: this.data.department,
        country: this.data.country
      })
    }
    else {
      this.employeeForm = this.fb.group({
        _id:[''],
        firstName: ['abcd', [Validators.required]],
        lastName: ['defd', [Validators.required]],
        email: ['abc@c.com', [Validators.required]],
        dateOfBirth: [new Date(), [Validators.required]],
        salary: ['5000', [Validators.required]],
        department: ['IT', [Validators.required]],
        country: ['India', [Validators.required]]
      })
    }



  }
  durationInSeconds = 5;
  onSubmit() {
    this.employeeForm.patchValue({
      dateOfBirth: this.employeeForm.value.dateOfBirth.toISOString()
    })
    console.log(this.employeeForm.value);

    console.log(this.data);

    if (this.data.action == 'Update') {
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
        this._snackBar.openFromComponent(NotifyComponent, {
          duration: this.durationInSeconds * 1000,
        });
      })
    }
    else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe((data) => {
        console.log(data);
        this.dialogRef.close();
        this._snackBar.openFromComponent(NotifyComponent, {
          duration: this.durationInSeconds * 1000,
        });
      })
    }



  }

}

@Component({
  selector: 'notify-component',
  template: `<span class="notify">
  Employee Added Successfully
</span>`,
  styles: [`
    .notify {
      color: hotpink;
    }
  `],
})
export class NotifyComponent { }
