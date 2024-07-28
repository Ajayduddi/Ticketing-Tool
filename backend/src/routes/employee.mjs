import { Router } from 'express';
import { body, checkSchema, matchedData, validationResult } from 'express-validator';
import passport from 'passport';
import { employeeSchema } from '../utils/validation-schema.mjs';
import { user } from '../mongoose/schemas/user.mjs';
import { hashPassword, generateUserId } from '../utils/helper.mjs';
import '../strategies/local-strategy.mjs';

const router = Router();


// login 
router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address').notEmpty().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
], (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: false, message: "Bad Request", data: result.array() });
    }
    next();
}, passport.authenticate('local'), (req, res) => {
    console.log(req.sessionID);
    console.log(req.session);
    res.status(200).json({ result: true, message: "Login successful", data: req.user });
});


// create employee 
router.post('/createEmployee', checkSchema(employeeSchema), async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: false, message: "Bad Request", data: result.array() });
    }
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }
        if (req.user) {
            if (req.user.role === 'superadmin') {
                await hashPassword(data.password).then(async (hash) => {
                    data.password = hash;
                }).catch((error) => {
                    res.status(500).json({ result: false, message: "Internal Server Error", data: error });
                });

                data.userId = generateUserId();

                if (await user.findOne({ email: data.email })) {
                    res.status(400).json({ result: false, message: "Email already exists", data: null });
                } else {
                    try {
                        console.log(data);
                        const newEmployee = new user(data);
                        const savedEmployee = await newEmployee.save();
                        res.status(201).json({ result: true, message: "Employee created successfully", data: savedEmployee });
                    } catch (error) {
                        res.status(500).json({ result: false, message: "Internal Server Error", data: error });
                    }
                }
            } else {
                res.status(403).json({ result: false, message: "You are not authorized to perform this action", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });

});


// get employee
router.get('/getEmployees', (req, res) => {
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }

        if (req.user) {
                const employees = await user.find();
                res.status(200).json({ result: true, message: "Employee fetched successfully", data: employees });
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });
});

// get employee by id
router.get('/getEmployeeById/:id', async (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                const employee = await user.findById(id);
                if (employee) {
                    res.status(200).json({ result: true, message: "Employee fetched successfully", data: employee });

                } else {
                    res.status(404).json({ result: false, message: "Employee not found", data: null });
                }
            } else {
                res.status(403).json({ result: false, message: "You are not authorized to perform this action", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });
});

// get employee by dept id
router.get('/getEmployeeByDeptId/:id', async (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                try {
                    const employee = await user.find({ deptId: id });
                    if (employee.length > 0) {
                        res.status(200).json({ result: true, message: "Employee fetched successfully", data: employee });
                    }
                    else {
                        res.status(404).json({ result: false, message: "Employee not found", data: null });
                    }
                } catch (error) {
                    res.status(500).json({ result: false, message: "Internal Server Error", data: error });
                }
            } else {
                res.status(403).json({ result: false, message: "You are not authorized to perform this action", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });
});

// update employee
router.put('/updateEmployee/:id', checkSchema(employeeSchema), (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                const result = validationResult(req);
                const data = matchedData(req);
                if (!result.isEmpty()) {
                    return res.status(400).json({ result: false, message: "Bad Request", data: result.array() });
                }

                await hashPassword(data.password).then(async (hash) => {
                    data.password = hash;
                }).catch((error) => {
                    res.status(500).json({ result: false, message: "Internal Server Error", data: error });
                });

                if (await user.findByIdAndUpdate(id, data)) {
                    res.status(200).json({ result: true, message: "Employee updated successfully", data: null });
                } else {
                    res.status(404).json({ result: false, message: "Employee not found", data: null });
                }
            } else {
                res.status(403).json({ result: false, message: "You are not authorized to perform this action", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });
});


// delete employee
router.delete('/deleteEmployee/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                if (await user.findByIdAndDelete(id)) {
                    res.status(200).json({ result: true, message: "Employee deleted successfully", data: null });
                } else {
                    res.status(404).json({ result: false, message: "Employee not found", data: null });
                }
            } else {
                res.status(403).json({ result: false, message: "You are not authorized to perform this action", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "unauthorized", data: null });
        }
    });
});

export default router;