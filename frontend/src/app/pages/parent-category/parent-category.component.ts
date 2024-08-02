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
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-parent-category',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    NaPipe,
    TableModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  templateUrl: './parent-category.component.html',
  styleUrl: './parent-category.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ParentCategoryComponent implements OnInit {
  deptList$: { id: string; name: string }[] = [];
  pcategoryList: ParentCategoryModel[] = [];
  categoryObj: ParentCategoryModel = new ParentCategoryModel();
  isvisable: boolean = false;

  pcategory = inject(CategoryService);
  dept = inject(DepartmentService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.getPCategory();
    this.getDept();
  }

  newCategory() {
    this.categoryObj = new ParentCategoryModel();
    this.isvisable = true;
  }

  reset() {
    this.categoryObj = new ParentCategoryModel();
  }

  getDept() {
    this.dept.getDept().subscribe((res: Api_Response) => {
      if (res.result) {
        this.deptList$ = res.data.map(
          (data: { _id: string; deptName: string }) => ({
            id: data._id,
            name: data.deptName,
          })
        );
      } else {
        console.log(res.message);
      }
    });
  }

  getPCategory() {
    this.pcategory.getParentCategories().subscribe((res: Api_Response) => {
      if (res.result) {
        this.pcategoryList = res.data;
      } else {
        console.log(res.message);
      }
    });
  }

  addPcategory() {
    this.pcategory.createParentCategory(this.categoryObj).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Parent Category Added Successfully',
          });
          this.isvisable = false;
          this.getPCategory();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: res.message,
          });
        }
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
        if (err.error.data) {
          for (let i of err.error.data) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: i.msg + ' ' + i.path,
            });
          }
        }
      },
    });
  }

  editPcategory(pcategory: ParentCategoryModel) {
    this.isvisable = true;
    this.categoryObj = pcategory;
  }

  updatePcategory() {
    this.pcategory.updateParentCategory(this.categoryObj).subscribe({
      next: (res: Api_Response) => {
        if (res.result) {
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Parent Category Updated Successfully',
          });
          this.isvisable = false;
          this.getPCategory();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: res.message,
          });
        }
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: err.error.message,
        });
        if (err.error.data) {
          for (let i of err.error.data) {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: i.msg + ' ' + i.path,
            });
          }
        }
      },
    });
  }

  deletePcategory(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Parent Category?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.pcategory.deleteParentCategory(id).subscribe({
          next: (res: Api_Response) => {
            if (res.result) {
              this.messageService.add({
                severity: 'success',
                summary: 'success',
                detail: 'Parent Category Deleted Successfully',
              });
              this.getPCategory();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: res.message,
              });
            }
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: err.error.message,
            });
            if (err.error.data) {
              for (let i of err.error.data) {
                this.messageService.add({
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
        this.messageService.add({
          severity: 'info',
          summary: 'info',
          detail: 'Delete cancelled',
        });
      },
    });
  }
}
