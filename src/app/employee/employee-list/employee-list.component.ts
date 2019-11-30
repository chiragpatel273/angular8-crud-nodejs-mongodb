import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../services/employee.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnChanges {

  @Input() employees: any[];
  @Output() refreshEmployee = new EventEmitter<any>();

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dateOfBirth', 'salary', 'department', 'country', 'action'];
  dataSource;
  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    console.log(this.employees);
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.employees);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action, obj) {
    console.log(obj);
    obj.action = action;
    if (action == 'Update') {
      const dialogRef = this.dialog.open(EmployeeFormComponent, {
        width: '450px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshEmployee.emit();
        // if(result.event == 'Add'){
        //   this.addRowData(result.data);
        // }else if(result.event == 'Update'){
        //   this.updateRowData(result.data);
        // }else if(result.event == 'Delete'){
        //   this.deleteRowData(result.data);
        // }
      });
    }
  
    else{
      const dialogRef = this.dialog.open(DeleteDialog, {
        width: '300px',
        data: obj._id
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshEmployee.emit();
      });
    }

}
    
    

}

@Component({
  template: `<h1 mat-dialog-title>Delete Employee</h1>
  <div mat-dialog-content>
    <p>Are you sure want to delete ?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" (click)="onYesClick()">Yes</button>
    <button mat-raised-button [mat-dialog-close]="false">No</button>
  </div>`
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<EmployeeFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private employeeService:EmployeeService
  ) { }
  onYesClick(){
    this.employeeService.deleteEmployee(this.data).subscribe((data) => {
      console.log(data);
      this.dialogRef.close();
    })
    
  }
}
