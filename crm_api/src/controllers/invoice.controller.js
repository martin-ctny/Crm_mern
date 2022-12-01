const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

const InvoiceController = {
    create: async (req, res) => {
        const data = req.body

        // const customer = await Customer.findById(data.customer)

        // if (!customer) {
        //     res.status(404).send('Customer not found')
        // }
        // data.customer = customer
        const invoice = await Invoice.create(data)
        await invoice.save()

        res.send(invoice)

        // customer.invoices.push(invoice)
        // await customer.save()
        
    },
    update: async (req, res) => {
        const newInvoice = req.body
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, newInvoice)
        res.send(invoice)
    },
    delete: async (req, res) => {
        Invoice.findByIdAndDelete(req.params.id, (err, invoice) => {
            if(err) {
                res.status(500).send(err)
            } else {
                Invoice.find({}, (err, invoices) => {
                    if(err) {
                        res.status(500).send
                    } else {
                        res.status(200).send(invoices)
                    }
                })
            }
        })
       
    },
    getAll: async (req, res) => {
        const invoicesList = await Invoice.find()
        res.send(invoicesList)
    },
    getOne: async (req, res) => {
        const invoice = await Invoice.findById(req.params.id)
        res.send(invoice)
    },
    getAllByCustomer: async (req, res) => {
        const invoicesList = await Invoice.find({customer: req.params.id})
        res.send(invoicesList)
}}

module.exports = InvoiceController