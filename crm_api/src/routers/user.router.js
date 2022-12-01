const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()


router.get('/users', UserController.getAll)
router.get('/users/:id', UserController.getOne)
router.post('/users', UserController.create)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.delete)
// router.delete('/users/customers/:id', UserController.getAllCustomers)

module.exports = router