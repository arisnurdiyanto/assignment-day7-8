const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/TicketController');
const { validateRequestBody } = require('../middleware/validationMiddleware');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/tickets', verifyToken, validateRequestBody, TicketController.createTicket);
router.get('/tickets', TicketController.getAllTickets);
router.put('/tickets/:id', verifyToken, TicketController.updateTicket);
router.delete('/tickets/:id', verifyToken, TicketController.deleteTicket);
router.post('/login', TicketController.login);

module.exports = router;