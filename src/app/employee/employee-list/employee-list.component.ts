import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeService } from '../services/employee.service';
import { DialogComponent } from '../dialog/dialog.component';
import { NotifyComponent } from '../notify/notify.component';



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
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar) {

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
  durationInSeconds = 5;
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

    else {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '300px',
        data: obj._id
      });

      dialogRef.afterClosed().subscribe(result => {
        this.refreshEmployee.emit();

        this._snackBar.openFromComponent(NotifyComponent, {
          duration: this.durationInSeconds * 1000,
          data:'Deleted'
        });

      });
    }
  }
}

