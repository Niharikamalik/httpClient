import { Component, EventEmitter, Input, Output, ViewChild, inject, input } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Task } from '../../Model/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from'@angular/material/icon'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'
import { MatCard } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import {MatDatepickerModule, matDatepickerAnimations} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select'

interface Priority{
  value : string,
  viewValue : string,
}
interface Status {
  value : string,
  viewValue : string,
}
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCard,
    MatFormField,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers :[provideNativeDateAdapter()],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})


export class CreateTaskComponent {


  priority :Priority[] = [
    {value : 'low' ,viewValue : 'Low'},
    {value : 'medium' ,viewValue : 'Medium'},
    {value : 'high' ,viewValue : 'High'},
    {value : 'critical' ,viewValue : 'Critical'},
   ]

   status : Status[] =[
    {value : 'open' ,viewValue : 'Open'},
    {value : 'started' ,viewValue : 'Started'},
    {value : 'inProgress' ,viewValue : 'In-Progress'},
    {value : 'complete' ,viewValue : 'Complete'},
   ]

  @Input()
  isEditMode:boolean = false

  @Input() selectedTask: Task  ;

  @ViewChild('taskForm')
  taskForm!: NgForm;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTask : EventEmitter<Task> = new EventEmitter<Task>();


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(()=>
    {
      this.taskForm.form.patchValue(this.selectedTask)
    },0)
  }

  OnCloseForm(){
    this.CloseForm.emit(false);

  }
  OnformSubmitted(task:any){
    // console.log(task.value);
    console.log(task.value)
    this.EmitTask.emit(task.value)
    this.CloseForm.emit(false);
  }

}
