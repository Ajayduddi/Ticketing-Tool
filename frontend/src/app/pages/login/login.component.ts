import { Component, inject } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Api_Response, LoginModel } from '../../core/models/api.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CheckboxModule,StyleClassModule,InputTextModule,ButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:LoginModel = new LoginModel();
  private router = inject(Router);
  private employee = inject(EmployeeService);

  onLogin() {
    this.employee.login(this.loginObj).subscribe((res:Api_Response)=>{
      if (res.result) {
        localStorage.setItem('user',JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      }
      else{
        alert(res.message);
      }
    })
  }

}
