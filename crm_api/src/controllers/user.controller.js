const User = require('../models/User');
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');

const UserController = {
    create: async (req, res) => {
        const user = new User(req.body);

        // user.password = await bcrypt.hash(user.password, 10);
    
        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send({error : error.message});
        }
    },
    update: async (req, res) => {
        try{
            const newUser = req.body
            const user = await User.findByIdAndUpdate(req.params.id, newUser)
            res.send(user)
        }
        catch(error){
            res.status(400).send({error : error.message});
        }
    },
    delete: async (req, res) => {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if (!deleteUser){
            return res.status(404).json({ message: "User not found"})
            
        }
        res.json(deleteUser)
    },
    getAll: async (req, res) => {
        const usersList = await User.find()
        res.send(usersList)
    },
    getOne: async (req, res) => {
        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).json({ message: "User not found"})
        }

        res.send(user)
    },
    // getAllCustomers: async (req, res) => {
    //     const id = req.params.id

    //     const user = await User.findById(id).populate('customers')
    //     if (!user){
    //         return res.status(404).json({ message: "User not found"})
    //     }
    //     res.send(user.customers)
    // }
}

module.exports = UserController