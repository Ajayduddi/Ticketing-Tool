import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DepartmentService } from '../../core/services/department.service';
import { Api_Response, DepartmentModel } from '../../core/models/api.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NaPipe } from "../../shared/pipes/na.pipe";

@Component({
    selector: 'app-department',
    standalone: true,
    templateUrl: './department.component.html',
    styleUrl: './department.component.css',
    imports: [CommonModule,TableModule, InputTextModule, ButtonModule, DatePipe, FormsModule, NaPipe]
})
export class DepartmentComponent implements OnInit {

  private dept = inject(DepartmentService);
  deptList: any[] = [];
  deptObj: DepartmentModel = new DepartmentModel();

  ngOnInit(): void {
    this.getdept();
  }

  reset(){
    this.deptObj = new DepartmentModel();
  }
  getdept(){
    this.dept.getDept().subscribe((res: Api_Response) => {
      this.deptList = res.data;
    });
  }

  addDept(){
    this.dept.createDept(this.deptObj).subscribe((res: Api_Response) => {
      if (res.result) {
        alert("Added Successfully");
        this.getdept();
      }
      else{
        alert(res.message);
      }
    });
  }

  editDept(dept: DepartmentModel){
    this.deptObj = dept;
  }

  updateDept(){
    this.dept.updateDept(this.deptObj).subscribe((res: Api_Response) => {
      if (res.result) {
        alert("Updated Successfully");
        this.getdept();
      }
      else{
        alert(res.message);
      }
    });
  }

  deleteDept(deptId:string){
    const isConfirm = window.confirm('Are you sure you want to delete this record?');
    if (isConfirm) {
    this.dept.deleteDept(deptId).subscribe((res: Api_Response) => {
      if (res.result) {
        alert('Redord deleted successfully');
        this.getdept();
      }
      else{
        alert(res.message);
      }
    });
  }
  }
}
