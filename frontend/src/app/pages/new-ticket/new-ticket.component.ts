import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Api_Response, EmployeeModel, TicketModel } from '../../core/models/api.model';
import { TicketService } from '../../core/services/ticket.service';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../core/services/category.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  providers: [MessageService, ConfirmationService],
})
export class NewTicketComponent implements OnInit {
  ticketObj: TicketModel = new TicketModel();
  user: EmployeeModel = JSON.parse(localStorage.getItem('user') || '');
  empList$: { id: string; name: string }[] = [];
  deptlist$: { id: string; name: string }[] = [];
  pCategoryList: { id: string; name: string}[] = [];
  categoryList: { id: string; name: string, parentCategoryId: string }[] = [];
  categoryList1: { id: string; name: string, parentCategoryId: string }[] = [];
  loading: boolean = false;

  private message = inject(MessageService);
  private confirm = inject(ConfirmationService);
  private router = inject(Router);
  private ticket = inject(TicketService);
  private employee = inject(EmployeeService);
  private dept = inject(DepartmentService);
  private category = inject(CategoryService);

  ngOnInit(): void {
    this.ticketObj.createdByEmployee = this.user._id;
    this.getEmpList();
    this.getDept();
    this.getPcategory();
    this.getCategory();
  }

  pchange() {
    this.categoryList1 = this.categoryList;
    const result = this.categoryList1.filter((item: { parentCategoryId: string; }) => (item.parentCategoryId === this.ticketObj.parentCategoryId));
    this.categoryList1 = result;
  }
  getEmpList() {
    this.employee.getEmployees().subscribe((res: Api_Response) => {
      if (res.result) {
        this.empList$ = res.data.map((item: { _id: string; name: string; }) => ({ id: item._id, name: item.name }));
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
        this.deptlist$ = res.data.map((item: { _id: string; deptName: string; }) => ({ id: item._id, name: item.deptName }));
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
    this.category.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.pCategoryList = res.data.map((item: { _id: string; categoryName: string; }) => ({ id: item._id, name: item.categoryName }));
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  getCategory() {
    this.category.getChildCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.categoryList = res.data.map((item: { _id: string; categoryName: string; parentCategoryId: string; }) => ({ id: item._id, name: item.categoryName, parentCategoryId: item.parentCategoryId, }));
      } else {
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  reset() {
    this.ticketObj = new TicketModel();
    this.ticketObj.createdByEmployee = this.user._id;
  }
  onSubmit() {
    this.confirm.confirm({
      message: 'Are you sure you want to submit this Ticket?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.loading = false;
        this.ticket.createTicket(this.ticketObj).subscribe(
          {
            next: (res: Api_Response) => {
              if (res.result) {
                this.message.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Ticket Created Successfully',
                });
                setTimeout(() => {
                  this.router.navigateByUrl('tickets');
                }, 1000);
              } else {
                this.loading = false;
                this.message.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.message,
                });
              }
            },
            error: (err: any) => {
              this.message.add({ severity: 'error', summary: 'error', detail: err.error.message });
              if (err.error.data) {
                for (let i of err.error.data) {
                  this.message.add({ severity: 'error', summary: 'error', detail: i.msg + ' ' + i.path });
                }
            
              }
            },
          }
        );
      },
      reject: () => {
        this.loading = false;
        this.message.add({
          severity: 'info',
          summary: 'info',
          detail: 'Submit cancelled',
        });
      },
    });
  }
}

