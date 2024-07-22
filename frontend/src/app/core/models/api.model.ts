export interface Api_Response {
  message: string;
  result: boolean;
  data: any;
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export class EmployeeModel {
  _id: string;
  name: string;
  contactNo: number;
  email: string;
  deptId: string;
  password: string;
  gender: string;
  role: string;
  status: string;

  constructor() {
    this._id = '';
    this.name = '';
    this.contactNo = 0;
    this.email = '';
    this.deptId = '';
    this.password = '';
    this.gender = '';
    this.role = '';
    this.status = 'Active';
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

export class TicketModel {
  _id: string;
  ticketNo: string;
  createdByEmployee: string;
  assignedToEmployee: string;
  contactNo: number;
  requestDetails: string;
  severity: string;
  parentCategoryId: string;
  childCategoryId: string;
  deptId: string;
  status: string;
  expectedEndDate: Date;
  completedDate: Date;
  createdDate: Date;

  constructor() {
    this._id = '';
    this.ticketNo = '';
    this.createdByEmployee = '';
    this.assignedToEmployee = '';
    this.contactNo = 0;
    this.requestDetails = '';
    this.severity = '';
    this.parentCategoryId = '';
    this.childCategoryId = '';
    this.deptId = '';
    this.status = '';
    this.expectedEndDate = new Date();
    this.completedDate = new Date();
    this.createdDate = new Date();
  }
}

export class DepartmentModel {
  _id: string;
  deptName: string;
  createdate: Date;

  constructor() {
    this._id = '';
    this.deptName = '';
    this.createdate = new Date();
  }
}

export class ParentCategoryModel {
  _id: string;
  categoryName: string;
  deptId: string;

  constructor() {
    this._id = '';
    this.categoryName = '';
    this.deptId = '';
  }
}

export class ChildcaregoryModel {
  _id: string;
  categoryName: string;
  parentCategoryId: string;

  constructor() {
    this._id = '';
    this.categoryName = '';
    this.parentCategoryId = '';
  }
}
