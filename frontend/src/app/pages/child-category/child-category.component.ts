import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NaPipe } from '../../shared/pipes/na.pipe';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Api_Response, ChildcaregoryModel, } from '../../core/models/api.model';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child-category',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, NaPipe, TableModule, DropdownModule, FormsModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css',
})
export class ChildCategoryComponent implements OnInit{
  pcategoryList: { id: string; name: string }[] = [];
  categoryList: ChildcaregoryModel[] = [];
  categoryObj: ChildcaregoryModel = new ChildcaregoryModel();

  category = inject(CategoryService);

  ngOnInit(): void {
    this.getPCategory();
    this.getCategory();
  }

  reset() {
    this.categoryObj = new ChildcaregoryModel();
  }

  getPCategory() {
    this.category.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        for (let data of res.data) {
          this.pcategoryList.push({ id: data._id, name: data.categoryName });
        }
      } else {
        console.log(res.message);
      }
    });
  }

  getCategory() {
    this.category.getChildCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.categoryList = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  addCategory() {
    this.category.createChildCategory(this.categoryObj).subscribe((res: Api_Response) => {
        if (res.result) {
          alert('Child Category Added Successfully');
          this.getCategory();
        } else {
          alert(res.message);
        }
      });
  }

  editCategory(category: ChildcaregoryModel) {
    this.categoryObj = category;
  }

  updateCategory() {
    this.category.updateChildCategory(this.categoryObj).subscribe((res: Api_Response) => {
        if (res.result) {
          alert('Child Category Updated Successfully');
          this.getCategory();
        } else {
          alert(res.message);
        }
      });
  }

  deleteCategory(id: string) {
    const isConfirm = window.confirm(
      'Are you sure you want to delete this Category?'
    );
    if (isConfirm) {
      this.category.deleteChildCategory(id).subscribe((res: Api_Response) => {
        if (res.result) {
          alert('Category Deleted Successfully');
          this.getCategory();
        } else {
          alert(res.message);
        }
      });
    }
  }
}
