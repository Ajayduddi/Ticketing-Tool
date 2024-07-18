import { Router } from 'express';
import employeeRouter from '../routes//employee.mjs';
import deptRoputer from '../routes/departments.mjs';
import categoryRouter from '../routes/category.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Ticketing tool API!!');
});

router.use(employeeRouter);
router.use(deptRoputer);
router.use(categoryRouter);

export default router;