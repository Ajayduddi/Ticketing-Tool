import { Component, inject, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Api_Response, LoginModel } from '../../core/models/api.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,CheckboxModule,StyleClassModule,InputTextModule,ButtonModule,FormsModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  
  loading: boolean = false;
  loginObj:LoginModel = new LoginModel();
  
  private router = inject(Router);
  private employee = inject(EmployeeService);
  private message = inject(MessageService);

  ngOnInit(): void {
    this.loginObj.email = 'admin@gmail.com';
    this.loginObj.password = 'Admin@119';
  }

  onLogin() {
      this.loading = true;
    this.employee.login(this.loginObj).subscribe(
      {
        next: (res: Api_Response) => {
          if (res.result) {
            localStorage.setItem('user', JSON.stringify(res.data));
            this.router.navigateByUrl('dashboard');
          } else {
            this.loading = false;
            console.log(res.message);
            this.message.add({ severity: 'error', summary: 'Error', detail: res.message });
          }
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
          this.message.add({ severity: 'error', summary: 'error', detail: "Invalid Credentials" });
          }
        },
    );
  }
}
