import { Component, EventEmitter, Inject, Input, OnInit, Output, input } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider'
import { Task } from '../../Model/task';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent{
  

  constructor(public dialogRef: MatDialogRef<TaskDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data : any) {
  }

  onNoClick(): void {

    this.dialogRef.close();
  }



}
