import { Router } from 'express';
import { user } from '../mongoose/schemas/user.mjs';
import { dept } from '../mongoose/schemas/departments.mjs';
import { parentCategory } from '../mongoose/schemas/parentCategory.mjs';
import { childCategory } from '../mongoose/schemas/childCategory.mjs';
import { ticket } from '../mongoose/schemas/tickets.mjs';

const router = Router();


// get all Tickets


export default router;