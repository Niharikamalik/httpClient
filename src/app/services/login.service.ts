import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class LoginService {
  http :HttpClient = inject(HttpClient);

  logError(data : {StatusCode : number , errormessage : string,datatime : Date}){
    this.http.post('https://angularhttp-fed75-default-rtdb.firebaseio.com/login.json',data)
    .subscribe();
  }

  fetcherror(){
    this.http.get('https://angularhttp-fed75-default-rtdb.firebaseio.com/login.json')
    .subscribe((data)=>{
      console.log(data);
    })
  }
}
