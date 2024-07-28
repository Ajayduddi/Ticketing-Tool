import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/constant';
import { Api_Response, TicketModel } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  
  // dashboard
  getDashboard():Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.Dashboard, {withCredentials: true});
  }

  // get all tickets
  getAllTickets():Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetAllTickets, {withCredentials: true});
  }

  // get ticket by id
  getTicketById(id: string):Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetTicketById+'/'+id, {withCredentials: true});
  }

  // get created tickets by employee id
  getCreatedTicketsByEmpId(id: string):Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetCreatedTicketsByEmpId+'/'+id, {withCredentials: true});
  }

  // get assigned tickets by employee id
  getAssignedTicketsByEmpId(id: string):Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetAssignedTicketsByEmpId+'/'+id, {withCredentials: true});
  }

  // create ticket
  createTicket(ticket: TicketModel):Observable<Api_Response> {
    return this.http.post<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.CreateTicket, ticket, {withCredentials: true});
  }

  // assign ticket
  assignTicket(data:any):Observable<Api_Response> {
    return this.http.post<Api_Response>(environment.API_URL + Constant.API_ENDPOINTS.AssignTicket + '/' + data.id, data, { withCredentials: true });
  }

  // start ticket
  startTicket(id: string): Observable<Api_Response> { 
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.StartTicket + '/' + id,
      {}, // empty body
      { withCredentials: true } // withCredentials: true to send cookies
    );
  }

  // close ticket
  closeTicket(id: string):Observable<Api_Response> {
    return this.http.post<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.CloseTicket + '/' + id,
      {}, // empty body
      { withCredentials: true } // withCredentials: true to send cookies
    );
  }

  // delete ticket
  deleteTicket(id: string):Observable<Api_Response> {
    return this.http.delete<Api_Response>(
      environment.API_URL + Constant.API_ENDPOINTS.DeleteTicket + '/' + id,
      { withCredentials: true } // withCredentials: true to send cookies
    );
  }
}
