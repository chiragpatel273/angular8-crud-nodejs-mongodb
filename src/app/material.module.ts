import { NgModule } from '@angular/core';
import { MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, 
    MatDatepickerModule, MatSelectModule,MatNativeDateModule,MatSnackBarModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
    ],
    exports: [MatTableModule, MatButtonModule, MatDialogModule, MatFormFieldModule, 
        MatInputModule, MatDatepickerModule, MatSelectModule,MatNativeDateModule,MatSnackBarModule],
})
export class MaterialModule { }
