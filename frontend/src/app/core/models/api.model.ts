export interface Api_Response {
  message: string;
  result: boolean;
  data: any;
}

export class LoginModel {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}

export class EmployeeModel {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = '';
  }
}

export class RequestByFilterModel {
  ticketNo: string;
  employeeId: number;
  assignedTo: number;

  constructor() {
    this.ticketNo = '';
    this.employeeId = 0;
    this.assignedTo = 0;
  }
}

export class TicketModel{
  employeeId: number;
  severity: string;
  childCategoryId: number;
  deptId: number;
  requestDetails: string;

  constructor() {
    this.employeeId = 0;
    this.severity = '';
    this.childCategoryId = 0;
    this.deptId = 0;
    this.requestDetails = '';
  }
}

export class DepartmentModel {
  deptId: 0;
  deptName: string;
  createdDate: Date;

  constructor() {
    this.deptId = 0;
    this.deptName = '';
    this.createdDate = new Date();
  }
}

export class ParentCategoryModel {
  categoryId: number;
  categoryName: string;
  deptId: number;

  constructor() {
    this.categoryId = 0;
    this.categoryName = '';
    this.deptId = 0;
  }
}

export class ChildcaregoryModel {
  childCategoryId: number;
  CategoryName: string;
  parentCategoryId: number;

  constructor() {
    this.childCategoryId = 0;
    this.CategoryName = '';
    this.parentCategoryId = 0;
  }
}
