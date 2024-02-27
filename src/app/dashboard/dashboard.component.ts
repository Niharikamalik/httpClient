import { Component, OnInit, inject } from '@angular/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { CommonModule } from '@angular/common';
import { Task } from '../Model/task';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { Subscribable, Subscription, map, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule} from '@angular/material/button'
import { TaskService } from '../services/task.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CreateTaskComponent,
    TaskDetailsComponent,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDivider,
    MatIconModule

  ],
  providers: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit {

  showCreateTaskForm: boolean = false;
  http:HttpClient = inject(HttpClient);
  allTask : Task[] = []
  EditMode : boolean = false;
  selectedTask : Task;
  CurrentTaskId : string = '';
  isLoading:boolean = false ;
  ErrorMessage:string|null;
  errorSub : Subscription;
  currentTask :Task|null;
  // showTaskDetails: boolean = false;

  constructor(public dialog: MatDialog){};



  taskService:TaskService = inject(TaskService);
  ngOnInit(): void {
    this.fetchTaskData();
    this.errorSub = this.taskService.errorSubject.subscribe({
      next:(httpError)=>{
        this.setError(httpError)
      }
    })

  }

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.errorSub.unsubscribe();
}
//---------------- open form=-------------------------

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
    this.EditMode = false;
    this.selectedTask = { title:'',
     desc : '' ,
     assign : '' ,
     create : '' ,
     Priority : '' ,
     Status : '' }
  }

// ------------------close form------------------------

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
    // this.showTaskDetails = false;

  }

// -------------------post request ------------------------

  createOrEditTask(data:Task){
    if(!this.EditMode){
      this.taskService.CreateTask(data);
      this.fetchAllTask()
    }
    else{
      this.taskService.UpdateTask(this.CurrentTaskId,data);
      this.fetchAllTask
    }
      // console.log(response)
  }

  // ------------------ get response ------------------------

  private fetchTaskData(){
      this.isLoading = true;
      this.taskService.GetAllTaskData().subscribe( {
        next :(response)=>{
        this.allTask = response;
        this.isLoading=false;
        },
        error : (err) =>{
          this.setError(err);
          console.log(err )
          this.isLoading = false;
        }
      })

  }

  //------------------------ set error-----------------------

  setError(err:HttpErrorResponse){
    if(err.error.error === 'Permission denied'){
      this.ErrorMessage = "You do not have permission to perform this action";
    }
    else{
      this.ErrorMessage = err.message;
    }

    setTimeout(() => {
      this.ErrorMessage =null;
    }, 10000);
  }

  //------------------------- delete task ------------------------------------

  deleteTask(id:string | undefined){

    this.taskService.DeleteTask(id);
    this.fetchTaskData()

  }

//-------------------------------- delete All task -----------------------------
  deleteAllTask(){

    this.taskService.DeleteAllTask();
    this.fetchAllTask()
  }
// ----------- fetch data  in dashboard ------------------------------------
  fetchAllTask(){
    this.fetchTaskData();
  }

  // edit task --------------------------------

  OnEditTask(id:string | undefined){

    this.CurrentTaskId = id;
    this.showCreateTaskForm = true;
    this.EditMode = true;
    this.selectedTask =  this.allTask.find((task) => {
      return task.id === id
    })
  }

  // ------------------- details-------------------------------
  onShowDetail(id:string|undefined){
    this.taskService.getTaskDetails(id).pipe(
      switchMap(task => {
        // Open dialog here and pass task data
        return this.dialog.open(TaskDetailsComponent, {
          
          disableClose :true,
          data: task
        }).afterClosed();
      })
    ).subscribe();
  }
}
