import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Api_Response, ParentCategoryModel } from '../../core/models/api.model';
import { CategoryService } from '../../core/services/category.service';
import { DepartmentService } from '../../core/services/department.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, NaPipe, TableModule, DropdownModule, FormsModule],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css'
})
export class ParentCategoryComponent implements OnInit {
  deptList: { id: string, name: string }[] = [];
  pcategoryList: ParentCategoryModel[] = [];
  categoryObj: ParentCategoryModel = new ParentCategoryModel();

  pcategory = inject(CategoryService);
  dept = inject(DepartmentService);

  ngOnInit(): void {
    this.getPCategory();
    this.getDept();
  }

  reset() {
    this.categoryObj = new ParentCategoryModel();
  }

  getDept() {
    this.dept.getDept().subscribe((res: Api_Response) => {
      if (res.result) {
        for (let data of res.data) {
          this.deptList.push({ id: data._id, name: data.deptName });
        }
      }
      else {
        console.log(res.message);
      }
    })
  }

  getPCategory() {
    this.pcategory.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.pcategoryList = res.data;
        console.log(this.pcategoryList);
      }
      else {
        console.log(res.message);
      }
    })
  }

  addPcategory() {
    this.pcategory.createParentCategory(this.categoryObj).subscribe((res: Api_Response) => {
      if (res.result) {
        alert("Parent Category Added Successfully");
        this.getPCategory();
      }
      else {
        alert(res.message);
      }
    });
  }

  editPcategory(pcategory: ParentCategoryModel) {
    this.categoryObj = pcategory;
  }

  updatePcategory() {
    this.pcategory.updateParentCategory(this.categoryObj).subscribe((res: Api_Response) => {
      if (res.result) {
        alert("Parent Category Updated Successfully");
        this.getPCategory();
      }
      else {
        alert(res.message);
      }
    })
  }

  deletePcategory(id: string) {
    const isConfirm = window.confirm('Are you sure you want to delete this Parent Category?');
    if (isConfirm) {
      this.pcategory.deleteParentCategory(id).subscribe((res: Api_Response) => {
        if (res.result) {
          alert("Parent Category Deleted Successfully");
          this.getPCategory();
        }
        else {
          alert(res.message);
        }
      })
    }
  }
  
}
