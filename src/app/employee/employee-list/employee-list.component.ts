import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,OnChanges {

  @Input() employees:any[];
  @Output() refreshEmployee = new EventEmitter<any>();
  
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dateOfBirth','salary','department','country','action'];
  dataSource;
  constructor(public dialog: MatDialog) { 
    
  }

  ngOnInit() {
    console.log(this.employees);
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.employees);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action,obj) {
    console.log(obj);
    obj.action = action;
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '250px',
      data:obj
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

}
