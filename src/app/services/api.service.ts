import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl:string = 'https://employee-portal-server-566g.onrender.com'
  constructor(private http:HttpClient) { }

  log = new BehaviorSubject(false)

  changeBehave(data:any){
    this.log.next(data)
  }

  //login api
  loginApi(){
    return this.http.get(`${this.serverUrl}/employee/1`)
  }

  //add employee api 
  addEmpApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/employee`, reqBody)
  }

  //get employee
  getAllEmployeeApi(){
    return this.http.get(`${this.serverUrl}/employee`)
  }

  //api to delete an employee
  removeEmployeeApi(id:any){
    return this.http.delete(`${this.serverUrl}/employee/${id}`)
  }

  //api to get individual employee details
  getAEmployeeApi (id:any){
    return this.http.get(`${this.serverUrl}/employee/${id}`)
  }

  //api to update employee details
  updateEmployeeApi(id:any, reqBody:any){
    return this.http.put(`${this.serverUrl}/employee/${id}`, reqBody)
  }

  //update admin details
  updateAdminApi (reqBody:any){
    return this.http.put(`${this.serverUrl}/employee/1`, reqBody)
  }
  
}
