import { Router } from 'express';
import { ticket } from '../mongoose/schemas/tickets.mjs';
import { checkSchema, validationResult, matchedData } from 'express-validator';
import { ticketSchema } from '../utils/validation-schema.mjs';
import { generateTicketId } from '../utils/helper.mjs';

const router = Router();


// get all Tickets
router.get('/getAllTickets', (req, res) => {
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
           res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const tickets = await ticket.find({});
                res.status(200).json({ result: true, message: "All Tickets", data: tickets });
            } catch (error) {
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
  })
});

// get Ticket by ID
router.get('/getTicketById/:id', async (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
           res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const findticket = await ticket.findById(id);
                res.status(200).json({ result: true, message: "Ticket", data: findticket });
            } catch (error) {
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
  })
});


//cteate ticket
router.post('/createTicket', checkSchema(ticketSchema), async (req, res) => {
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
           res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }
        if (req.user) {
            if (result.isEmpty) {
               try {
                   data.ticketNo = generateTicketId();
                   const newticket = new ticket(data);
                   const savedTicket = await newticket.save();
                   res.status(201).json({ result: true, message: "Ticket Created", data: savedTicket });
               } catch (error) {
                   console.log(error);
                    res.status(500).json({ result: false, message: "Internal Server Error", data: error });
               }
            } else {
                res.status(400).json({ result: false, message: "Bad Request", data: result });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
  })
});


export default router;