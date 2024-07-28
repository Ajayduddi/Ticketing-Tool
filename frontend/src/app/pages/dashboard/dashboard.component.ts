import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { Api_Response, EmployeeModel } from '../../core/models/api.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  allTickets: number | undefined;
  myTickets: number | undefined;
  assignedTickets: number | undefined;
  openTickets: number | undefined;
  progressTickets: number | undefined;
  allEmp: number | undefined;
  user: EmployeeModel = JSON.parse(localStorage.getItem('user') || '');

  newDeptTickets: number | undefined;
  newMyTickets: number | undefined;
  newAssignedTickets: number | undefined;
  newEmployees: number | undefined;
  newOpenTickets: number | undefined;
  newProgressTickets: number | undefined;

  private ticket = inject(TicketService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ticket.getDashboard().subscribe((res: Api_Response) => {
      if (res.result) {
        if (this.user.role === 'superadmin') {
          this.allTickets = res.data.allTickets;
          this.myTickets = res.data.myTickets;
          this.assignedTickets = res.data.AssignedTickets;
          this.allEmp = res.data.allEmployees;
          this.openTickets = res.data.openTickets;
          this.progressTickets = res.data.ProgressTickets + res.data.startTickets;

          this.newDeptTickets = res.data.newdeptTickets;
          this.newMyTickets = res.data.newmyTickets;
          this.newAssignedTickets = res.data.newAssignedTickets;
          this.newEmployees = res.data.newdeptEmployees;
          this.newOpenTickets = res.data.newopenTickets;
          this.newProgressTickets = res.data.newProgressTickets + res.data.newstartTickets;
        }
        else if (this.user.role === 'Department Head') {
          this.allTickets = res.data.deptTickets;
          this.myTickets = res.data.myTickets;
          this.assignedTickets = res.data.AssignedTickets;
          this.openTickets = res.data.openTickets;
          this.progressTickets = res.data.ProgressTickets + res.data.startTickets;
          this.allEmp = res.data.deptEmployees;

          this.newDeptTickets = res.data.newdeptTickets;
          this.newMyTickets = res.data.newmyTickets;
          this.newAssignedTickets = res.data.newAssignedTickets;
          this.newEmployees = res.data.newdeptEmployees;
          this.newOpenTickets = res.data.newopenTickets;
          this.newProgressTickets = res.data.newProgressTickets + res.data.newstartTickets;
        }
        else {
          this.myTickets = res.data.myTickets;
          this.assignedTickets = res.data.AssignedTickets;

          this.newMyTickets = res.data.newmyTickets;
          this.newAssignedTickets = res.data.newAssignedTickets;
        }
      }
      else {
        alert(res.message);
      }
    })
  }

}
