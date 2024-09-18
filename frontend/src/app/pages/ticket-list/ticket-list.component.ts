import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { Api_Response, EmployeeModel, TicketModel } from '../../core/models/api.model';
import { DepartmentService } from '../../core/services/department.service';
import { EmployeeService } from '../../core/services/employee.service';
import { CategoryService } from '../../core/services/category.service';
import { TicketService } from '../../core/services/ticket.service';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';

type SeverityType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'secondary'
  | 'contrast'
  | undefined;

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    DataViewModule,
    ButtonModule,
    DatePipe,
    NaPipe,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    SelectButtonModule,
    DropdownModule,
    TagModule,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class TicketListComponent implements OnInit {
  empList: { id: string; empId: string; name: string }[] = [];
  deptlist: { id: string; name: string }[] = [];
  pcategoryList: { id: string; name: string }[] = [];
  categoryList: { id: string; name: string }[] = [];
  ticketList: TicketModel[] = [];
  mytickets: TicketModel[] = [];
  assignedtickets: TicketModel[] = [];
  user: EmployeeModel = JSON.parse(localStorage.getItem('user') || '');
  isvisble: string | undefined;
  isdialog: boolean = false;
  ticketdisplay: TicketModel[] | undefined;
  stateOptions: any[] | undefined;
  ticketObj: { id: string; assignedToEmployee: string } = {
    id: '',
    assignedToEmployee: '',
  };


  dept = inject(DepartmentService);
  emp = inject(EmployeeService);
  catgory = inject(CategoryService);
  ticket = inject(TicketService);
  message = inject(MessageService);
  confirm = inject(ConfirmationService);
  router = inject(Router);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.user.role === 'superadmin') {
      this.isvisble = 'getall';
      this.stateOptions = [
        { label: 'All Tickets', value: 'getall' },
        { label: 'My Tickets', value: 'mytickets' },
        { label: 'Assigned Tickets', value: 'assignedtickets' },
      ];
    } else if (this.user.role === 'Department Head') {
      this.isvisble = 'getall';
      this.stateOptions = [
        { label: 'Department Tickets', value: 'getall' },
        { label: 'My Tickets', value: 'mytickets' },
        { label: 'Assigned Tickets', value: 'assignedtickets' },
      ];
    } else {
      this.isvisble = 'mytickets';
      this.stateOptions = [
        { label: 'My Tickets', value: 'mytickets' },
        { label: 'Assigned Tickets', value: 'assignedtickets' },
      ];
    }

    this.getEmployee();
    this.getDept();
    this.getPcategory();
    this.getChildcategory();
    this.getTicket();
    this.getMyTicket();
    this.getAssignedTicket();
  }

  getSeverity(ticket: TicketModel): SeverityType {
    switch (ticket.status) {
      case 'Open':
        return 'info';

      case 'Assigned':
        return 'secondary';

      case 'In Progress':
        return 'warning';

      case 'Closed':
        return 'success';

      default:
        return undefined;
    }
  }

  view(ticket_: TicketModel) {
    localStorage.setItem('ticket', JSON.stringify(ticket_));
    this.router.navigate(['/pages/ticket-view']);
  }

  reset() {
    this.ticketObj.assignedToEmployee = '';
  }

  isdialogv(ticket: TicketModel) {
    this.ticketObj.id = ticket._id;
    this.isdialog = true;
  }

  tickets() {
    if (this.isvisble === 'getall') {
      this.ticketdisplay = this.ticketList;
      if (this.user.role === 'Department Head') {
        this.ticketdisplay = this.ticketdisplay.filter(
          (item: { deptId: string }) => item.deptId === this.user.deptId
        );
      }
    } else if (this.isvisble === 'mytickets') {
      this.ticketdisplay = this.mytickets;
    } else {
      this.ticketdisplay = this.assignedtickets;
    }
  }

  getEmployee() {
    this.emp.getEmployees().subscribe((res: Api_Response) => {
      if (res.result) {
        this.empList = res.data.map(
          (item: { _id: string; userId: string; name: string }) => ({
            id: item._id,
            empId: item.userId,
            name: item.name,
          })
        );
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getDept() {
    this.dept.getDept().subscribe((res: Api_Response) => {
      if (res.result) {
        res.data.forEach((element: { _id: string; deptName: string }) => {
          this.deptlist.push({ id: element._id, name: element.deptName });
        });
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getPcategory() {
    this.catgory.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        res.data.forEach((element: { _id: string; categoryName: string }) => {
          this.pcategoryList.push({
            id: element._id,
            name: element.categoryName,
          });
        });
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getChildcategory() {
    this.catgory.getChildCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        res.data.forEach((element: { _id: string; categoryName: string }) => {
          this.categoryList.push({
            id: element._id,
            name: element.categoryName,
          });
        });
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getTicket() {
    this.ticket.getAllTickets().subscribe((res: Api_Response) => {
      if (res.result) {
        this.ticketList = res.data;
        this.tickets();
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getMyTicket() {
    this.ticket
      .getCreatedTicketsByEmpId(this.user._id)
      .subscribe((res: Api_Response) => {
        if (res.result) {
          this.mytickets = res.data;
          this.tickets();
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      });
  }

  getAssignedTicket() {
    this.ticket
      .getAssignedTicketsByEmpId(this.user._id)
      .subscribe((res: Api_Response) => {
        if (res.result) {
          this.assignedtickets = res.data;
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      });
  }

  assignTicket() {
    this.ticket.assignTicket(this.ticketObj).subscribe({
      next: (res: Api_Response) => {
        this.isdialog = false;
        if (res.result) {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket Assigned Successfully',
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        }
      },
      error: (err: any) => {
        this.message.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
        if (err.error.data) {
          for (let i of err.error.data) {
            this.message.add({
              severity: 'error',
              summary: 'error',
              detail: i.msg + ' ' + i.path,
            });
          }
        }
      },
    });
  }

  starttkt(id: string) {
    this.ticket.startTicket(id).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket Started Successfully',
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        }
      },
      error: (err: any) => {
        this.message.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
        if (err.error.data) {
          for (let i of err.error.data) {
            this.message.add({
              severity: 'error',
              summary: 'error',
              detail: i.msg + ' ' + i.path,
            });
          }
        }
      },
    });
  }

  closetkt(id: string) {
    this.ticket.closeTicket(id).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket Closed Successfully',
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
          this.getTicket();
          this.getMyTicket();
          this.getAssignedTicket();
        }
      },
      error: (err: any) => {
        this.message.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
        if (err.error.data) {
          for (let i of err.error.data) {
            this.message.add({
              severity: 'error',
              summary: 'error',
              detail: i.msg + ' ' + i.path,
            });
          }
        }
      },
    });
  }

  deletetkt(id: string) {
    this.confirm.confirm({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this ticket?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.ticket.deleteTicket(id).subscribe({
          next: (res: Api_Response) => {
            if (res.result) {
              this.message.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Ticket Deleted Successfully',
              });
              this.getTicket();
              this.getMyTicket();
              this.getAssignedTicket();
            } else {
              this.message.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
              this.getTicket();
              this.getMyTicket();
              this.getAssignedTicket();
            }
          },
          error: (err: any) => {
            this.message.add({
              severity: 'error',
              summary: 'error',
              detail: err.error.message,
            });
            if (err.error.data) {
              for (let i of err.error.data) {
                this.message.add({
                  severity: 'error',
                  summary: 'error',
                  detail: i.msg + ' ' + i.path,
                });
              }
            }
          },
        });
      },
      reject: () => {
        this.message.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Delete Cancelled',
        });
      },
    });
  }
}
