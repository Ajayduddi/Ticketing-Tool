import { Router } from 'express';
import employeeRouter from '../routes//employee.mjs';
import deptRoputer from '../routes/departments.mjs';
import categoryRouter from '../routes/category.mjs';
import ticketRouter from '../routes/tickets.mjs';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Ticketing tool API!!');
});

router.get("/set-cookie", (req, res) => {
  res.cookie("thirdPartyTest", "enabled", {
    maxAge: 900000,
    httpOnly: false,
  });
  res.send("Cookie set");
});

router.get("/check-cookie", (req, res) => {
  const cookie = req.cookies["thirdPartyTest"];
  res.send(cookie ? "enabled" : "disabled");
});

router.use(employeeRouter);
router.use(deptRoputer);
router.use(categoryRouter);
router.use(ticketRouter);

export default router;