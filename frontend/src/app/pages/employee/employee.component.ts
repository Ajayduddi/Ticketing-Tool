import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Api_Response, DepartmentModel, EmployeeModel } from '../../core/models/api.model';
import { EmployeeService } from '../../core/services/employee.service';
import { Observable } from 'rxjs';
import { DepartmentService } from '../../core/services/department.service';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { DataViewModule } from 'primeng/dataview';
import { AvatarModule } from 'primeng/avatar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,ButtonModule,FormsModule,InputTextModule,InputNumberModule,DropdownModule,RadioButtonModule,NaPipe,DataViewModule,AvatarModule,DialogModule,ToastModule,ConfirmDialogModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
  providers: [MessageService, ConfirmationService],
})
export class EmployeeComponent implements OnInit{
  
  empObj: EmployeeModel = new EmployeeModel();
  deptlist$:{id:string, name:string}[] = []; //Observable<DepartmentModel[]> = inject(DepartmentService).getDept();
  roles$: {name:string}[] = [];
  empList$: EmployeeModel[] = [];
  user: EmployeeModel = JSON.parse(localStorage.getItem('user') || '');
  isvisable: boolean = false;

  emp = inject(EmployeeService);
  dept = inject(DepartmentService);
  message = inject(MessageService);
  confirm = inject(ConfirmationService);

  ngOnInit() {
    this.getDept();
    this.getRoles();
    this.getemployees();
    this.empObj.gender = 'male';
  }

  newEmp() {
    this.empObj = new EmployeeModel();
    this.isvisable = true;
  }

  cancelEmp() {
    this.empObj = new EmployeeModel();
    this.isvisable = false;
  }

  reset(){
    this.empObj = new EmployeeModel();
  }

  getDept(){
    this.dept.getDept().subscribe((res:Api_Response) => {
      if(res.result){
        this.deptlist$ = res.data.map((item: { _id: string; deptName: string; }) => ({ id: item._id, name: item.deptName }));
      }
    })
  }

  getRoles(){
    this.emp.getRoles().subscribe((res:Api_Response)=>{
      if (res.result) {
        this.roles$ = res.data.map((item: string) => ({name:item}));
    }
  })
  }

  getemployees(){
    this.emp.getEmployees().subscribe((res:Api_Response) => {
      if(res.result){
       if (this.user.role === 'superadmin') {
        this.empList$ = res.data;
        }
       else {
         this.empList$ = res.data.filter((item: {deptId: String}) => item.deptId === this.user.deptId);
        }
      }
      else{
        alert(res.message);
      }
    })
  }

  onSubmit() {
    this.emp.createEmployee(this.empObj).subscribe(
      {
        next: (res: Api_Response) => {
          if (res.result) {
            this.message.add({ severity: 'success', summary: 'Employee Added Successfully' });
            this.isvisable = false;
            this.getemployees();
          }
          else {
            this.message.add({ severity: 'error', summary: 'error', detail: res.message });
          }
        },
        error: (err: any) => {
          this.message.add({ severity: 'error', summary: 'error', detail: err.error.message });
          if (err.error.data) {
            for(let i of err.error.data){
              this.message.add({ severity: 'error', summary: 'error', detail: i.msg + ' '+ i.path });
            }
            
          }
        },
      }
    );
  }

  onEdit(emp: EmployeeModel) {
    this.empObj = emp;
    this.isvisable = true;
  }

  onDelete(id:string){
    this.confirm.confirm({
      message: 'Are you sure you want to delete this Employee?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.emp.deletEmployee(id).subscribe(
          {
            next: (res: Api_Response) => {
              if (res.result) {
                this.message.add({
                  severity: 'success',
                  summary: 'successs',
                  detail: 'Employee Deleted Successfully',
                });
                this.getemployees();
              } else {
                this.message.add({ severity: 'error', summary: 'error', detail: res.message });
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

  onUpdate(){
    this.emp.updateEmployee(this.empObj).subscribe(
      {
        next: (res: Api_Response) => {
          if (res.result) {
            this.message.add({ severity: 'success', summary: 'success', detail: 'Employee Updated Successfully' });
            this.isvisable = false;
            this.getemployees();
          }
          else {
            this.message.add({ severity: 'error', summary: 'error', detail: res.message });
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
}
