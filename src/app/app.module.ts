import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeFormComponent, PizzaPartyComponent } from './employee/employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    PizzaPartyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents:[EmployeeFormComponent,PizzaPartyComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
