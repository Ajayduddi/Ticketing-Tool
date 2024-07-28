import { Router } from 'express';
import { ticket } from '../mongoose/schemas/tickets.mjs';
import { user } from '../mongoose/schemas/user.mjs';
import { checkSchema, validationResult, matchedData, body } from 'express-validator';
import { ticketSchema } from '../utils/validation-schema.mjs';
import { generateTicketId } from '../utils/helper.mjs';

const router = Router();


// dashboard
router.get('/dashboard', (req, res) => {
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            if (req.user.role === 'Department Head') {
                const tickets = await ticket.find({deptId: req.user.deptId,});
                const deptTickets = tickets.length;
                const newdeptTickets = tickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                let myTickets = await ticket.find({createdByEmployee: req.user._id,});
                const newmyTickets = myTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                myTickets = myTickets.length;
                let AssignedTickets = await ticket.find({assignedToEmployee: req.user._id,});
                const newAssignedTickets = AssignedTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                AssignedTickets = AssignedTickets.length;
                let deptEmployees = await user.find({deptId: req.user.deptId,});
                const newdeptEmployees = deptEmployees.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                deptEmployees = deptEmployees.length;
                let openTickets = await ticket.find({deptId: req.user.deptId,status: "Open",});
                const newopenTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7))).length;
                openTickets = openTickets.length;
                let ProgressTickets = await ticket.find({ deptId: req.user.deptId, status: "In Progress" });
                const newProgressTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7) && (x.status === "In Progress" || x.status === 'Closed'))).length;
                ProgressTickets = ProgressTickets.length;
                let startTickets = await ticket.find({ deptId: req.user.deptId, status: "Assigned" });
                const newstartTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7) && x.status === "Assigned")).length;
                startTickets = startTickets.length;
               
                res.status(200).json({ result: true, message: "Dashboard", data: { deptTickets, myTickets, AssignedTickets, deptEmployees, openTickets, ProgressTickets, startTickets, newdeptTickets, newmyTickets, newAssignedTickets, newdeptEmployees, newopenTickets, newProgressTickets, newstartTickets } });
            }
            else if(req.user.role === 'superadmin') {
                 const tickets = await ticket.find();
                const allTickets = tickets.length;
                const newdeptTickets = tickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                let myTickets = await ticket.find({createdByEmployee: req.user._id,});
                const newmyTickets = myTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                myTickets = myTickets.length;
                let AssignedTickets = await ticket.find({assignedToEmployee: req.user._id,});
                const newAssignedTickets = AssignedTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                AssignedTickets = AssignedTickets.length;
                let allEmployees = await user.find();
                const newdeptEmployees = allEmployees.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                allEmployees = allEmployees.length;
                let openTickets = await ticket.find({deptId: req.user.deptId,status: "Open",});
                const newopenTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7))).length;
                openTickets = openTickets.length;
                let ProgressTickets = await ticket.find({ deptId: req.user.deptId, status: "In Progress" });
                const newProgressTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7) && (x.status === "In Progress" || x.status === 'Closed'))).length;
                ProgressTickets = ProgressTickets.length;
                let startTickets = await ticket.find({ deptId: req.user.deptId, status: "Assigned" });
                const newstartTickets = tickets.filter((x) => (x.createdDate >= new Date(new Date().getDate() - 7) && x.status === "Assigned")).length;
                startTickets = startTickets.length;
               
                res.status(200).json({ result: true, message: "Dashboard", data: { allTickets, myTickets, AssignedTickets, allEmployees, openTickets, ProgressTickets, startTickets, newdeptTickets, newmyTickets, newAssignedTickets, newdeptEmployees, newopenTickets, newProgressTickets, newstartTickets } });
            }
            else {
                let myTickets = await ticket.find({ createdByEmployee: req.user._id });
                const newmyTickets = myTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                myTickets = myTickets.length;
                let AssignedTickets = await ticket.find({ assignedToEmployee: req.user._id });
                const newAssignedTickets = AssignedTickets.filter((x) => x.createdDate >= new Date(new Date().getDate() - 7)).length;
                AssignedTickets = AssignedTickets.length;
                
                res.status(200).json({result:true,message:"Dashboard",data:{myTickets,AssignedTickets,newmyTickets,newAssignedTickets}});
            }
        }
        else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
});

// get all Tickets
router.get('/getAllTickets', (req, res) => {
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const tickets = await ticket.find();
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
router.get('/getTicketById/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const findticket = await ticket.findById(id);
                if (findticket) {
                    res.status(200).json({ result: true, message: "Ticket", data: findticket });
                } else {
                    res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                }
            } catch (error) {
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    })
});

// Get Assigned Tickets By EmpId
router.get('/getAssignedTicketsByEmpId/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const findTicket = await ticket.find({ assignedToEmployee: id });
                if (findTicket) {
                    res.status(200).json({ result: true, message: "Ticket", data: findTicket });
                } else {
                    res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                }
            } catch (error) {
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
})

// Get Created Tickets By EmpId
router.get('/getCreatedTicketsByEmpId/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) { 
            const tickets = await ticket.find({ createdByEmployee: id });
            if (tickets) {
                res.status(200).json({ result: true, message: "Ticket", data: tickets });
            } else {
                res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
});

//create ticket
router.post('/createTicket', checkSchema(ticketSchema), (req, res) => {
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
                    data.status = 'Open';
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

// asign ticket to user
router.post('/assignTicket/:id', [
    body('assignedToEmployee').isString().withMessage('Invalid Employee ID').notEmpty().withMessage('Employee ID is required'),
], async (req, res) => {
    const id = String(req.params.id);
    const result = validationResult(req);
    const data = matchedData(req);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            if (req.user.role == "Department Head" || req.user.role == "superadmin") {
                if (result.isEmpty()) {
                    try {
                        const findTicket = await ticket.findById(id);
                        if (findTicket) {
                            findTicket.assignedToEmployee = data.assignedToEmployee;
                            findTicket.status = "Assigned";
                            await findTicket.save();
                            res.status(200).json({ result: true, message: "Ticket Assigned", data: null });
                        } else {
                            res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                        }
                    } catch (error) {
                        res.status(500).json({ result: false, message: "Internal Server Error", data: error });
                    }
                }
                else {
                    res.status(400).json({ result: false, message: "Bad Request", data: result });
                }
            } else {
                res.status(403).json({ result: false, message: "Forbidden, You are not authorized to perform this operation", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
});

// start ticket
router.post('/startTicket/:id', (req, res) => { 
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => { 
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const findticket = await ticket.findById(id);
                if (findticket) { 
                    console.log('start ticket');
                    findticket.status = "In Progress";
                    await findticket.save();
                    res.status(200).json({ result: true, message: "Ticket Started", data: null });
                }
                else {
                    console.log('ticket not found');
                    res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        }
        else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
});

// close ticket
router.post('/closeTicket/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            try {
                const findTicket = await ticket.findById(id);
                if (findTicket) {
                    findTicket.completedDate = new Date();
                    findTicket.status = "Closed";
                    await findTicket.save();
                    res.status(200).json({ result: true, message: "Ticket Closed", data: null });
                }
                else {
                    res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({ result: false, message: "Internal Server Error", data: error });
            }
        }
        else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
})

// delete ticket
router.delete('/deleteTicket/:id', (req, res) => {
    const id = String(req.params.id);
    req.sessionStore.get(req.sessionID, async (err) => {
        console.log(req.sessionID);
        if (err) {
            res.status(500).json({ result: false, message: "Internal Server Error", data: err });
        }

        if (req.user) {
            if (req.user.role === "superadmin") {
                const findTicket = await ticket.deleteOne({ _id: id });
                if (findTicket) {
                    res.status(200).json({ result: true, message: "Ticket Deleted", data: null });
                } else {
                    res.status(404).json({ result: false, message: "Ticket Not Found", data: null });
                }
            } else {
                res.status(403).json({ result: false, message: "Forbidden, You are not authorized to perform this operation", data: null });
            }
        } else {
            res.status(401).json({ result: false, message: "Unauthorized", data: null });
        }
    });
});

export default router;