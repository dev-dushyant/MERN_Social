const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server') 


const { SECRET_KEY } = require('../../config')
const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        user_name: user.user_name
    }, SECRET_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        async login(_, { user_name, password }){
            const { errors, valid } = validateLoginInput(user_name, password)

            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const user = await User.findOne( { user_name })
            
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', { errors })
            }
            
            const match = await bcrypt.compare(password,user.password) 
            if(!match) {
                errors.general = 'Wrong credential' 
                throw new UserInputError('Wrong credential', { errors })
            }

            const token = generateToken(user)
            return {
                ...user._doc,
                id: user._id,
                token
            }

        },
        async register(
            _, 
            {
                registerInput: { user_name, email, password, confirmPassword }
            }, 
        ){
            //TODO: Validate Data
            const { valid, errors } = validateRegisterInput(user_name, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }
            //TODO: Make sure user already does not exist 
            const user = await User.findOne({ user_name })
            if(user){
                throw new UserInputError('Username is taken', {
                    error: {
                        user_name: 'This user name is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12)
            
            const newUser = new User({
                email,
                user_name,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
