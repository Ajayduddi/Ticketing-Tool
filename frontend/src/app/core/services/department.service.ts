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
      environment.API_URL + Constant.API_ENDPOINTS.GetDepartments,
      { withCredentials: true }
    );
  }

  createDept(obj: DepartmentModel): Observable<Api_Response> {
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.CreateDepartment,
      obj,
      { withCredentials: true }
    );
  }

  updateDept(obj: DepartmentModel): Observable<Api_Response> {
    return this.http.put<Api_Response>(
      environment.API_URL +
        Constant.API_ENDPOINTS.UpdateDepartment +
        '/' +
        obj._id,
      obj,
      { withCredentials: true }
    );
  }

  deleteDept(id: string): Observable<Api_Response> {
    return this.http.delete<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.DeleteDepartment + '/' + id,
      { withCredentials: true }
    );
  }
}
