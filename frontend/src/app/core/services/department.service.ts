import { HttpClient } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';
import { Api_Response, DepartmentModel } from '../models/api.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  
  constructor(private http: HttpClient) {}

  getDept(): Observable<Api_Response> {
    return this.http.get<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.GetDepartments
    );
  }

  createDept(obj: DepartmentModel): Observable<Api_Response> {
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.CreateDepartment,
      obj
    );
  }

  updateDept(obj: DepartmentModel): Observable<Api_Response> {
    return this.http.put<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.UpdateDepartment,
      obj
    );
  }

  deleteDept(id: number): Observable<Api_Response> {
    return this.http.delete<Api_Response>(
      environment.API_URL +
        Constant.API_ENDPOINTS.DeleteDepartment +
        '?id=' +
        id
    );
  }
}
