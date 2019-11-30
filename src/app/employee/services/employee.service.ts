import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl:string = 'http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getEmployees():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/get`);
  }

  addEmployee(employee):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/create`,employee)
  }

  updateEmployee(employee):Observable<any>{
    console.log(employee);
    return this.http.put<any>(`${this.baseUrl}/update/${employee._id}`,employee)
  }

  deleteEmployee(id):Observable<any>{
    console.log(id);
    return this.http.post<any>(`${this.baseUrl}/remove/${id}`,'')
  }

}
