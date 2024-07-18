import { Router } from 'express';
import { body, validationResult, matchedData } from 'express-validator';
import { parentCategory } from '../mongoose/schemas/parentCategory.mjs';
import { childCategory } from '../mongoose/schemas/childCategory.mjs';

const router = Router();

// get parent categories
router.get('/getParentCategories', (req, res) => {
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            try {
                const getParentCategories = await parentCategory.find();
                res.status(200).json({ Result: true, message: '', data: getParentCategories });
            } catch (error) {
                res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
            }
        }
        else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// create parent category
router.post('/createParentCategory', [
    body('categoryName').isString().withMessage('Enter a valid category name').notEmpty().withMessage('Category name is required'),
    body('deptId').isString().withMessage('Enter a valid department id').notEmpty().withMessage('Department id is required'),
], (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                try {
                    const createParentCategory = new parentCategory(data);
                    const saveParentCategory = await createParentCategory.save();
                    res.status(201).json({ Result: true, message: 'Parent category created successfully', data: saveParentCategory });
                } catch (error) {
                    res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                }
            } else {
                res.status(403).json({ Result: false, message: 'you have no permission to access this route', data: null });
            }
        } else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// update parent category
router.put('/updateParentCategory/:id', [
    body('categoryName').isString().withMessage('Enter a valid category name').notEmpty().withMessage('Category name is required'),
    body('deptId').isString().withMessage('Enter a valid department id').notEmpty().withMessage('Department id is required'),
], (req, res) => {
    const id = String(req.params.id);
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }
        if (req.user) {
            if (req.user.role === 'superadmin') {
                if (!result.isEmpty()) {
                    res.status(400).json({ Result: false, message: 'Bad Request', data: result });
                }
                else {
                    try {
                        if (await parentCategory.findByIdAndUpdate(id, data)) {
                            res.status(200).json({ Result: true, message: 'Parent category updated successfully', data: null });
                        }
                        else {
                            res.status(404).json({ Result: false, message: 'parent category is not found', data: null });
                        }
                    } catch (error) {
                        res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                    }
                }
            } else {
                res.status(403).json({ Result: false, message: 'you have no permission to access this route', data: null });
            }
        } else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// delete parent category
router.delete('/deleteParentCategory/:id', (req, res) => { 
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }   

        if (req.user) {
            if (req.user.role === 'superadmin') {
                try {
                    if (await parentCategory.findByIdAndDelete(id)) {
                        res.status(200).json({ Result: true, message: 'Parent category deleted successfully', data: null });
                    }
                    else {
                        res.status(404).json({ Result: false, message: 'Parent category is not found', data: null });
                    }
                } catch (error) {
                    res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                }
            } else {
                res.status(403).json({ Result: false, message: 'you have no permission to access this route', data: null });
            }
        } else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// get child categories
router.get('/getChildCategories', (req, res) => { 
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            try {
                const getChildCategories = await childCategory.find();
                res.status(200).json({ Result: true, message: '', data: getChildCategories });
            } catch (error) {
                res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
            }
        }
        else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// get child category by parent id
router.get('/getChildCategoryByParentId/:parentId', function (req, res) {
    const parentId = String(req.params.parentId);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            try {
                const getChildCategoryByParentId = await childCategory.find({ parentCategoryId: parentId });
                if (getChildCategoryByParentId.length > 0) {
                    res.status(200).json({ Result: true, message: '', data: getChildCategoryByParentId });
                }
                else {
                    res.status(404).json({ Result: false, message: 'Child category is not found', data: null });
                }
            } catch (error) {
                res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
            }
        }
        else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});

// create child category
router.post('/createChildCategory', [
    body('categoryName').isString().withMessage('Enter a valid category name').notEmpty().withMessage('Category name is required'),
    body('parentCategoryId').isString().withMessage('Enter a valid parent category id').notEmpty().withMessage('Parent category id is required'),
], (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                if (result.isEmpty()) {
                    try {
                        const createChildCategory = new childCategory(data);
                        const saveChildCategory = await createChildCategory.save();
                        res.status(201).json({ Result: true, message: 'Child category created successfully', data: saveChildCategory });
                    } catch (error) {
                        res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                    }
                }
                else {
                    res.status(400).json({ Result: false, message: 'Bad Request', data: result.array() });  
                }
            } else {
                res.status(403).json({ Result: false, message: 'you have no permission to access this route', data: null });
            }
        } else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});

// update child category
router.put('/updateChildCategory/:id', [
    body('categoryName').isString().withMessage('Enter a valid category name').notEmpty().withMessage('Category name is required'),
    body('parentCategoryId').isString().withMessage('Enter a valid parent category id').notEmpty().withMessage('Parent category id is required'),
], (req, res) => {
    const id = String(req.params.id);
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }
        if (req.user) {
            if (req.user.role === 'superadmin') {
                if (!result.isEmpty()) {
                    res.status(400).json({ Result: false, message: 'Bad Request', data: result });
                }
                else {
                    try {
                        if (await childCategory.findByIdAndUpdate(id, data)) {
                            res.status(200).json({ Result: true, message: 'Child category updated successfully', data: null });
                        }
                        else {
                            res.status(404).json({ Result: false, message: 'Child category is not found', data: null });
                        }
                    } catch (error) {
                        res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                    }
                }
            } else {
                res.status(403).json({ Result: false, message: 'you have no permission to access this route', data: null });
            }
        } else {
            req.sessionStore.set(req.sessionID, req.session);   
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


// delete child category
router.delete('/deleteChildCategory/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (error) => {
        console.log(req.sessionID);
        if (error) {
            res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
        }

        if (req.user) {
            if (req.user.role === 'superadmin') {
                try {
                    if (await childCategory.findByIdAndDelete(id)) {
                        res.status(200).json({ Result: true, message: 'Successfully deleted child category', data: id });
                    } else {
                        res.status(404).json({ Result: false, message: 'child category is not found', data: id });
                    }
                } catch (error) {
                    res.status(500).json({ Result: false, message: 'Internal Server Error', data: error });
                }
            } else {
                res.status(403).json({ Result: false, message: 'You are not authorized to delete child category', data: id });
            }
        } else {
            res.status(401).json({ Result: false, message: 'Unauthorized', data: null });
        }
    });
});


export default router;