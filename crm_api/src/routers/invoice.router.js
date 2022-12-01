const express = require('express')
const InvoiceController = require('../controllers/invoice.controller')
const router = express.Router()


router.get('/invoices', InvoiceController.getAll)
router.get('/invoices/:id', InvoiceController.getOne)
router.post('/invoices', InvoiceController.create)
router.put('/invoices/:id', InvoiceController.update)
router.delete('/invoices/:id', InvoiceController.delete)
router.get('/invoices/customers/:id', InvoiceController.getAllByCustomer)

module.exports = router