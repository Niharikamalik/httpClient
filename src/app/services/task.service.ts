import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Task } from "../Model/task";
import { Subject, catchError, map, throwError } from "rxjs";
import { LoginService } from "./login.service";
import { response } from "express";


@Injectable({
  providedIn: 'root',

})

export class TaskService{

  http :HttpClient = inject(HttpClient);
  errorSubject = new Subject<HttpErrorResponse>();
  loginService : LoginService = inject(LoginService);

// ------------ Create Task --------------------------------

  CreateTask(task:Task){
    const headers = new HttpHeaders({'my-header':'hello world'});
    this.http.post<{name:string}>(
      'https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks.json',
      task, {headers : headers})
      .subscribe({
        error:(err)=>{
          this.errorSubject.next(err);
        }
    })
  }

// --------------Fetch All Task form Firebase -------------------

  GetAllTaskData(){

    let queryParams = new HttpParams();
    queryParams = queryParams.set('page',2);
    queryParams = queryParams.set('item' , 10);


    return this.http.get<{[key:string]: Task}>(
      'https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks.json'
    ,{params:queryParams}).pipe(map((response)=>{
      let task = [];
// convert response object into array
      for(let key in response){
        if(response.hasOwnProperty(key)){
          task.push({...response[key],id:key})
        }
      }
      return task;
    }), catchError((err)=>{
      const errorObj = {StatusCode : err.status , errormessage : err.message ,datatime : new Date()}
      this.loginService.logError(errorObj)
      return throwError(() => err);
    }))

  }

//------------------------ Delete Task -----------------------------

  DeleteTask(id:string|undefined){
    this.http.delete(
      'https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks/'+ id+'.json'
      ).pipe(
        catchError((err)=>{
          const errorObj = {StatusCode : err.status , errormessage : err.message ,datatime : new Date()}
          this.loginService.logError(errorObj)
          return throwError(() => err);
        })
      ).subscribe({
        error:(err)=>{
          this.errorSubject.next(err);
        }
    });

  }

// ----------------------Delete all records---------------------------

  DeleteAllTask(){
    this.http.delete('https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks.json')
    .pipe(
      catchError((err)=>{
        const errorObj = {StatusCode : err.status , errormessage : err.message ,datatime : new Date()}
        this.loginService.logError(errorObj)
        return throwError(() => err);
      })
    ).subscribe({
      error:(err)=>{
        this.errorSubject.next(err);
      }
     }
    );
  }


  // update task

  UpdateTask(id:string|undefined , data:Task){

    this.http.put('https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks/'+ id+'.json',data)
    .pipe(
      catchError((err)=>{
        const errorObj = {StatusCode : err.status , errormessage : err.message ,datatime : new Date()}
        this.loginService.logError(errorObj)
        return throwError(() => err);
      })
    ).subscribe({
      error:(err)=>{
        this.errorSubject.next(err);
      }
     }
    );
  }
  getTaskDetails(id:string|undefined){
    return this.http.get('https://angularhttp-fed75-default-rtdb.firebaseio.com/tasks/'+ id+'.json')

  }
}
