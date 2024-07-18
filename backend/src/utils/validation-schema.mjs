export const employeeSchema = {
    name: {
        isString: {
            withMessage: 'Please enter a valid name',
        },
        notEmpty: {
            withMessage: 'Name is required',
        },
    },
    contactNo: {
       isNumeric: {
            withMessage: 'Please enter a valid contact number',
        },
        notEmpty: {
            withMessage: 'Contact number is required',
        },
        isLength: {
            Option: {
                min: 10,
                max: 10
            },
            withMessage: 'Contact number must be 10 digits',
        },
    },
    email: {
        isEmail: {
            withMessage: 'Please enter a valid email',
        },
        notEmpty: {
            withMessage: 'Email is required',
        },
    },
    password: {
        isLength: {
            Option: {
                min: 6,
                max: 255
            },
            withMessage: 'Password must be at least 6 characters long',
        },
        isString: {
            withMessage: 'Please enter a valid password',
        },
        notEmpty: {
            withMessage: 'Password is required',
        },
        isStrongPassword: {
            withMessage: 'Password must be strong',
            strongPasswordOptions: {
                minLength: 6,
                maxLength: 255,
                requireLowercase: true,
                requireUppercase: true,
                requireDigit: true,
                requireSpecialCharacter: true,
            },
        }
    },
    gender: {
        isString: {
            withMessage: 'Please enter a valid gender',
        },
        notEmpty: {
            withMessage: 'Gender is required',
        },
    },
    deptId: {
        isString: {
            withMessage: 'Please enter a valid department id',
        },
        notEmpty: {
            withMessage: 'Department id is required',
        },
    },
    role: {
        isString: {
            withMessage: 'Please enter a valid role',
        },
        notEmpty: {
            withMessage: 'Role is required',
        },
    },
    status: {
        isString: {
            withMessage: 'Please enter a valid status',
        },
        notEmpty: {
            withMessage: 'Status is required',
        },
    },

}