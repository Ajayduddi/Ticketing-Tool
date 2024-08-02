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
  console.log("setting cookie");
  const options = { maxAge: 900000, httpOnly: true };
  res.cookie("thirdPartyTest", "enabled", options);
  res.status(200).end();
});

router.get("/check-cookie", (req, res) => {
  console.log("checking cookie");
  console.log(req.cookies);
  const msg = req.cookies && req.cookies["thirdPartyTest"] ? req.cookies["thirdPartyTest"] : "disabled";
  res.json({ msg: msg }).end();
});

router.use(employeeRouter);
router.use(deptRoputer);
router.use(categoryRouter);
router.use(ticketRouter);

export default router;