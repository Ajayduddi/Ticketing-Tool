import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { NaPipe } from '../../../shared/pipes/na.pipe';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { Api_Response, EmployeeModel, TicketModel } from '../../../core/models/api.model';
import { DepartmentService } from '../../../core/services/department.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { CategoryService } from '../../../core/services/category.service';
import { TicketService } from '../../../core/services/ticket.service';
import { AvatarModule } from 'primeng/avatar';
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
  selector: 'app-ticket-view',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DatePipe,
    NaPipe,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    TagModule,
    AvatarModule
  ],
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.css',
  providers: [MessageService, ConfirmationService],
})
export class TicketViewComponent {
  empList: { id: string; empId: string; name: string }[] = [];
  deptlist: { id: string; name: string }[] = [];
  pcategoryList: { id: string; name: string }[] = [];
  categoryList: { id: string; name: string }[] = [];
  user: EmployeeModel = JSON.parse(localStorage.getItem('user') || '');
  isdialog: boolean = false;
  view: TicketModel = JSON.parse(localStorage.getItem('ticket') || '');
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

    this.getEmployee();
    this.getDept();
    this.getPcategory();
    this.getChildcategory();
  }

  getSeverity(): SeverityType {
    switch (this.view.status) {
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

  reset() {
    this.ticketObj.assignedToEmployee = '';
  }

  isdialogv(ticket: TicketModel) {
    this.ticketObj.id = ticket._id;
    this.isdialog = true;
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
          setTimeout(() => {
            this.router.navigate(['/tickets']);
          }, 1000);
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
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

  starttkt(id: string | '') {
    this.ticket.startTicket(id).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.message.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Ticket Started Successfully',
          });
          setTimeout(() => {
            this.router.navigate(['/tickets']);
          }, 1000);
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
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
          setTimeout(() => {
            this.router.navigate(['/tickets']);
          }, 1000);
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
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
             setTimeout(() => {
                this.router.navigate(['/tickets']);
              }, 1000);
            } else {
              this.message.add({
                severity: 'error',
                summary: 'Error',
                detail: res.message,
              });
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
