const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { createUser, comparePasswords } = require('./userHelper')


module.exports = {
    register: async (req, res) => {
        try {
            // check if email has a value
            if (!req.body.email) {
                throw {
                    status: 401,
                    message: 'No User submitted'
                }
            }
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
    },
    login: async (req, res) => {
        try {
            // check if the user exists / get the user from the db
            let foundUser = await User.findOne({email: req.body.email})
            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Not Found"
                }
            }

            // check if the password matches
            let checkedPassword = await comparePasswords(req.body.password, foundUser.password)

            if (!checkedPassword) {
                throw {
                    status: 401,
                    message: "Invalid Password"
                }
            }

            // res.status(200).json({
            //     userObj: {
            //         email: foundUser.email,
            //         firstname: foundUser.firstname,
            //         lastname: foundUser.lastname,
            //     },                
            //     message: "Successful Login!"
            // })
            
            res.status(200).json({
                email: foundUser.email,
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,                   
                message: "Successful Login!"
            })

            
        } catch (error) {
            res.status(error.status || 500 ).json(error.message)
        }
    }
}