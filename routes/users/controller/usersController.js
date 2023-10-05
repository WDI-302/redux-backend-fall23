const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { createUser } = require('./userHelper')

module.exports = {
    register: async (req, res) => {
        try {
            // if user exists throw an error
            let foundUser = await User.findOne({email: req.body.email})
            if (foundUser) { 
                throw {
                    status: 409,
                    message: 'User Exists'
                }
            }
            
            let newUser = await createUser(req.body)

            let savedUser = await newUser.save()

            res.status(200).json({
                email: savedUser.email,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname,
                message: "Successfully Registered"
            })

        } catch (error) {
            res.status(error.status || 500 ).json(error.message)
        }
    }
}