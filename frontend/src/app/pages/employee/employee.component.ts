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

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,ButtonModule,FormsModule,InputTextModule,DropdownModule,RadioButtonModule,NaPipe,DataViewModule,AvatarModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  empObj: EmployeeModel = new EmployeeModel();
  deptlist$:{name:string, id:number}[] = []; //Observable<DepartmentModel[]> = inject(DepartmentService).getDept();
  roles$: {name:string}[] = [];
  empList$: EmployeeModel[] = [];

  emp = inject(EmployeeService);
  dept = inject(DepartmentService);

  ngOnInit() {
    this.getDept();
    this.getRoles();
    this.getemployees();
  }

  getDept(){
    this.dept.getDept().subscribe((res:Api_Response) => {
      if(res.result){
        for (let item of res.data) {
          this.deptlist$.push({name:item.deptName,id:item.deptId});
        }
      }
    })
  }

  getRoles(){
    this.emp.getRoles().subscribe((res:Api_Response)=>{
      if (res.result) {
        for(let item of res.data){
          this.roles$.push({name:item});
      }
      console.log(this.roles$);
    }
  })
  }

  getemployees(){
    this.emp.getEmployees().subscribe((res:Api_Response) => {
      if(res.result){
        this.empList$ = res.data;
      }
      else{
        alert(res.message);
      }
    })
  }

  onSubmit() {
    this.emp.createEmployee(this.empObj).subscribe((res:Api_Response) => {
      if(res.result){
        alert(" Employee Added Successfully");
        this.getemployees();
      }
      else{
        alert(res.message);
      }
    })
  }

  onEdit(emp: EmployeeModel) {
    this.empObj = emp;
  }

  onDelete(id:number){
    const isConfirm = window.confirm('Are you sure you want to delete this Employee?');
    if (isConfirm) {
      this.emp.deletEmployee(id).subscribe((res:Api_Response)=>{
        if(res.result){
          alert("Employee Deleted Successfully");
          this.getemployees();
        }
        else{
          alert(res.message);
        }
      })
    }
  }

  onUpdate(){
    this.emp.updateEmployee(this.empObj).subscribe((res:Api_Response) => {
      if(res.result){
        alert(" Employee Updated Successfully");
        this.getemployees();
      }
      else{
        alert(res.message);
      }
    })
  }
}
