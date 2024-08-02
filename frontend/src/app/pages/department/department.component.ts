import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DepartmentService } from '../../core/services/department.service';
import { Api_Response, DepartmentModel } from '../../core/models/api.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-department',
  standalone: true,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DatePipe,
    FormsModule,
    NaPipe,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class DepartmentComponent implements OnInit {
  private dept = inject(DepartmentService);
  private message = inject(MessageService);
  private confirm = inject(ConfirmationService);

  isvisable: boolean = false;
  deptList: any[] = [];
  deptObj: DepartmentModel = new DepartmentModel();

  ngOnInit(): void {
    this.getdept();
  }

  reset() {
    this.deptObj = new DepartmentModel();
  }

  getdept() {
    this.dept.getDept().subscribe((res: Api_Response) => {
      this.deptList = res.data;
    });
  }

  newDept() {
    this.deptObj = new DepartmentModel();
    this.isvisable = true;
  }

  addDept() {
    this.dept.createDept(this.deptObj).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.isvisable = false;
          this.message.add({
            severity: 'success',
            summary: 'success',
            detail: 'Department Added Successfully',
          });
          this.getdept();
        } else {
          this.message.add({
            severity: 'error',
            summary: 'error',
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
  }

  editDept(dept: DepartmentModel) {
    this.deptObj = dept;
    this.isvisable = true;
  }

  updateDept() {
    this.dept.updateDept(this.deptObj).subscribe(
      {
        next: (res: Api_Response) => {
          if (res.result) {
            this.isvisable = false;
            this.message.add({
              severity: 'success',
              summary: 'success',
              detail: 'Department Updated Successfully',
            });
            this.getdept();
          } else {
            this.message.add({
              severity: 'error',
              summary: 'error',
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
  }

  deleteDept(deptId: string, event: Event) {
    this.confirm.confirm({
      target: event.target as EventTarget,
      message: 'Are you want to delete this Department?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.dept.deleteDept(deptId).subscribe(
          {
            next: (res: Api_Response) => {
              if (res.result) {
                this.message.add({
                  severity: 'success',
                  summary: 'success',
                  detail: 'Department deleted successfully',
                });
                this.getdept();
              } else {
                this.message.add({
                  severity: 'error',
                  summary: 'error',
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
        this.message.add({ severity: 'info',summary: 'info', detail: 'Delete cancelled' });
      },
    });
  }
}
