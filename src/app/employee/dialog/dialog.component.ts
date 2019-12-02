import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private employeeService: EmployeeService
  ) { }
  onYesClick() {
    this.employeeService.deleteEmployee(this.data).subscribe((data) => {
      console.log(data);
      this.dialogRef.close();
    })

  }

}
