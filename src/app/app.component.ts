import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from './employee/services/employee.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees:any[];

  constructor(private employeeService:EmployeeService,public dialog: MatDialog){}

  ngOnInit(){
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((employees) => {
      console.log(employees);
      this.employees = employees
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '450px',
      data: {action:'Add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getEmployees();
    });
  }


}

