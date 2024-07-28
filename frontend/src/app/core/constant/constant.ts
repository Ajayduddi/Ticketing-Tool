export const Constant = {
  Logo_Url: '../../../assets/app-assets/img/logo.png',
  API_ENDPOINTS: {
    // Employee
    Login: 'login',
    GetAllRoles: 'getRoles',
    CreateEmployee: 'createEmployee',
    GetEmployees: 'getEmployees',
    GetEmployeeById: 'getEmployeeById',
    GetEmployeesByDeptId: 'getEmployeeByDeptId',
    UpdateEmployee: 'updateEmployee',
    DeleteEmployee: 'deleteEmployee',

    // department
    GetDepartments: 'getDepartments',
    CreateDepartment: 'createDepartment',
    UpdateDepartment: 'updateDepartment',
    DeleteDepartment: 'deleteDepartment',

    // parent category
    GetParentCategories: 'getParentCategories',
    CreateParentCategory: 'createParentCategory',
    UpdateParentCategory: 'updateParentCategory',
    DeleteParentCategory: 'deleteParentCategory',

    // child category
    GetChildCategories: 'getChildCategories',
    GetChildCategoryByParentId: 'getChildCategoryByParentId',
    CreateChildCategory: 'createChildCategory',
    UpdateChildCategory: 'updateChildCategory',
    DeleteChildCategory: 'deleteChildCategory',

    // ticket
    GetAllTickets: 'getAllTickets',
    GetTicketById: 'getTicketById',
    GetCreatedTicketsByEmpId: 'getCreatedTicketsByEmpId',
    GetAssignedTicketsByEmpId: 'getAssignedTicketsByEmpId',
    CreateTicket: 'createTicket',
    AssignTicket: 'assignTicket',
    StartTicket: 'startTicket',
    CloseTicket: 'closeTicket',
    DeleteTicket: 'deleteTicket',

    //dashboard
    Dashboard : 'dashboard',
  },
};
