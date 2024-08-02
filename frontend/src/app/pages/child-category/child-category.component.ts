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
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-child-category',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, NaPipe, TableModule, DropdownModule, FormsModule, ToastModule, ConfirmDialogModule, DialogModule],
  templateUrl: './child-category.component.html',
  styleUrl: './child-category.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ChildCategoryComponent implements OnInit{
  pcategoryList: { id: string; name: string }[] = [];
  categoryList: ChildcaregoryModel[] = [];
  categoryObj: ChildcaregoryModel = new ChildcaregoryModel();
  isvisable: boolean = false;

  category = inject(CategoryService);
  message = inject(MessageService);
  confirm = inject(ConfirmationService);

  ngOnInit(): void {
    this.getPCategory();
    this.getCategory();
  }

  newCategory() {
    this.categoryObj = new ChildcaregoryModel();
    this.isvisable = true;
  }

  reset() {
    this.categoryObj = new ChildcaregoryModel();
  }

  getPCategory() {
    this.category.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.pcategoryList = res.data.map((data:{_id: string; categoryName: string; }) => ({ id: data._id, name: data.categoryName }));
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
          this.message.add({
            severity: 'success',
            summary: 'success',
            detail: 'Child Category Added Successfully',
          });
          this.isvisable = false;
          this.getCategory();
        } else {
         this.message.add({ severity: 'error',summary: 'error', detail: res.message });
        }
      });
  }

  editCategory(category: ChildcaregoryModel) {
    this.isvisable = true;
    this.categoryObj = category;
  }

  updateCategory() {
    this.category.updateChildCategory(this.categoryObj).subscribe((res: Api_Response) => {
        if (res.result) {
          this.message.add({
            severity: 'success',
            summary: 'success',
            detail: 'Child Category Updated Successfully',
          });
          this.isvisable = false;
          this.getCategory();
        } else {
          this.message.add({ severity: 'error',summary: 'error', detail: res.message });
        }
      });
  }

  deleteCategory(id: string) {
    this.confirm.confirm({
      message: 'Are you sure you want to delete this Category?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.category.deleteChildCategory(id).subscribe((res: Api_Response) => {
          if (res.result) {
            this.message.add({
              severity: 'success',
              summary: 'success',
              detail: 'Category Deleted Successfully',
            });
            this.getCategory();
          } else {
            this.message.add({
              severity: 'error',
              summary: 'error',
              detail: res.message,
            });
          }
        });
      },
      reject: () => {
        this.message.add({ severity: 'info',summary: 'info', detail: 'Delete cancelled' });
      },
    });
  }
}
