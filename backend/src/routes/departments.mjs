import { Router } from 'express';
import { roles } from '../utils/constants.mjs';
import { dept } from '../mongoose/schemas/departments.mjs';
import { body, validationResult, matchedData } from 'express-validator';

const router = Router();

// get roles
router.get('/getRoles', (req, res) => {
    req.sessionStore.get(req.sessionID, (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ error: 'Error retrieving session data.' });
        }

        if (req.user) {
            res.status(200).json({ Result: true, message: '', data: roles });
        }
        else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// get departments
router.get('/getDepartments', (req, res) => {
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ error: 'Error retrieving session data.' });
        }

        if (req.user) {
            try {
                const departments = await dept.find();
                res.status(200).json({ Result: true, message: '', data: departments });
            } catch (error) {
                res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
            }
        }
        else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// create department
router.post('/createDepartment', [
    body('deptName').isString().withMessage('Enter a valid department name').notEmpty().withMessage('Department name is required'),
], async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ Result: false, message: 'Bad Request', data: result.array() });
    }
    else {
        req.sessionStore.get(req.sessionID, async (error) => {
            console.log(req.sessionID);
            if (error) {
                res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
            }

            if (req.user) {
                if (req.user.role === 'superadmin') {
                    try {
                        const newDept = new dept(data);
                        const savedDept = await newDept.save();
                        res.status(201).json({ Result: true, message: 'Department created successfully', data: savedDept });
                    } catch (error) {
                        res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                    }
                } else {
                    res.status(403).json({ Result: false, message: 'You do not have permission to perform this action', data: null });
                }
            } else {
                res.status(401).json({ Result: false, message: 'unauthorized', data: null });
            }
        });
    }
});


// update department
router.put('/updateDepartment/:id', [
    body('deptName').isString().withMessage("Entre a valid Department Name").notEmpty().withMessage('Department name is required'),
], (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                const result = validationResult(req);
                const data = matchedData(req);
                if (!result.isEmpty()) {
                    return res.status(400).json({ Result: false, message: 'Bad Request', data: result.array() });
                }

                try {
                    if (await dept.findByIdAndUpdate(id, data)) {
                        res.status(200).json({ Result: true, message: 'Department updated successfully', data: null });
                    } else {
                        res.status(404).json({ Result: false, message: 'Department not found', data: null });
                    }
                } catch (error) {
                    res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                }
            } else {
                res.status(403).json({ Result: false, message: 'You do not have permission to perform this action', data: null });
            }
        } else {
            res.status(401).json({ Result: false, message: 'unauthorized', data: null });
        }
    });

});

// delete department
router.delete('/deleteDepartment/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ error: 'Error retrieving session data.' });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                try {
                    if (await dept.findByIdAndDelete(id)) {
                        res.status(200).json({ Result: true, message: 'Department deleted successfully', data: null });
                    }
                    else {
                        res.status(404).json({ Result: false, message: 'Department not found', data: null });
                    }
                } catch (error) {
                    res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                }
            } else {
                res.status(403).json({ Result: false, message: 'You do not have permission to perform this action', data: null });
            }
        }
    });
});

export default router;