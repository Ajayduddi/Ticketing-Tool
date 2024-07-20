import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { Api_Response, EmployeeModel, LoginModel } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  login(obj:LoginModel):Observable<Api_Response>{
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.Login,
      obj,
      { withCredentials: true }
    );
  }

  getRoles():Observable<Api_Response>{
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetAllRoles, { withCredentials: true });
  }

  getEmployees():Observable<Api_Response>{
    return this.http.get<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.GetEmployees,
      { withCredentials: true }
    );
}

  getEmployeeById(id:number):Observable<Api_Response>{
    return this.http.get<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.GetEmployeeById + '/' + id,
      { withCredentials: true }
    );
  }

  getEmployeeByDeptId(id:number):Observable<Api_Response>{
    return this.http.get<Api_Response>(
      environment.API_URL +
        Constant.API_ENDPOINTS.GetEmployeesByDeptId +
        '/' +
        id,
      { withCredentials: true }
    );
  }

  createEmployee(obj:EmployeeModel):Observable<Api_Response>{
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.CreateEmployee,
      obj,
      { withCredentials: true }
    );
  }

  updateEmployee(obj:EmployeeModel):Observable<Api_Response>{
    return this.http.put<Api_Response>(
      environment.API_URL +
        Constant.API_ENDPOINTS.UpdateEmployee +
        '/' +
        obj._id,
      obj,
      { withCredentials: true }
    );
  }

  deletEmployee(id:string):Observable<Api_Response>{
    return this.http.delete<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.DeleteEmployee + '/' + id,
      { withCredentials: true }
    );
  }
}
