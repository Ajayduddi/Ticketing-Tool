export const employeeSchema = {
    name: {
        isString: {
            errorMessage: 'Please enter a valid name',
        },
        notEmpty: {
            errorMessage: 'Name is required',
        },
    },
    contactNo: {
        isNumeric: {
            errorMessage: 'Please enter a valid contact number',
        },
        notEmpty: {
            errorMessage: 'Contact number is required',
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Contact number must be 10 digits',
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Please enter a valid email',
        },
        notEmpty: {
            errorMessage: 'Email is required',
        },
    },
    password: {
        isLength: {
            options: { min: 6, max: 255 },
            errorMessage: 'Password must be at least 6 characters long',
        },
        isString: {
            errorMessage: 'Please enter a valid password',
        },
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                maxLength: 255,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            },
            errorMessage: 'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
        },
    },
    gender: {
        isString: {
            errorMessage: 'Please enter a valid gender',
        },
        notEmpty: {
            errorMessage: 'Gender is required',
        },
    },
    deptId: {
        isString: {
            errorMessage: 'Please enter a valid department id',
        },
        notEmpty: {
            errorMessage: 'Department id is required',
        },
    },
    role: {
        isString: {
            errorMessage: 'Please enter a valid role',
        },
        notEmpty: {
            errorMessage: 'Role is required',
        },
    },
    status: {
        isString: {
            errorMessage: 'Please enter a valid status',
        },
        notEmpty: {
            errorMessage: 'Status is required',
        },
    },
}


export const ticketSchema = {
    createdByEmployee: {
        isString: {
            errorMessage: 'Please enter a valid createdByEmployee',
        },
        notEmpty: {
            errorMessage: 'CreatedByEmployee is required',
        },
    },
    contactNo: {
        isNumeric: {
            errorMessage: 'Please enter a valid contact number',
        },
        notEmpty: {
            errorMessage: 'Contact number is required',
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Contact number must be 10 digits',
        },
    },
    requestDetails: {
        isString: {
            errorMessage: 'Please enter a valid requestDetails',
        },
        notEmpty: {
            errorMessage: 'RequestDetails is required',
        },
    },
    parentCategoryId: {
        isString: {
            errorMessage: 'Please enter a valid parentCategoryId',
        },
        notEmpty: {
            errorMessage: 'ParentCategoryId is required',
        },
    },
    childCategoryId: {
        isString: {
            errorMessage: 'Please enter a valid childCategoryId',
        },
        notEmpty: {
            errorMessage: 'ChildCategoryId is required',
        },
    },
    deptId: {
        isString: {
            errorMessage: 'Please enter a valid deptId',
        },
        notEmpty: {
            errorMessage: 'DeptId is required',
        },
    },
    severity: {
        isString: {
            errorMessage: 'Please enter a valid severity',
        },
        notEmpty: {
            errorMessage: 'Severity is required',
        },
    },
    status: {
        isString: {
            errorMessage: 'Please enter a valid status',
        },
        optional: true, // Make it optional if it's not always required
    },
    completedDate: {
        // isISO8601: {
        //     errorMessage: 'Please enter a valid date in ISO format (YYYY-MM-DD)',
        // },
        idDate: {
            errorMessage: 'Please enter a valid date in YYYY-MM-DD format',
        },
        optional: true, // Make it optional if it's not always required
    },
}