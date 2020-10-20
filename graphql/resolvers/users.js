const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
    Mutation: {
    async register(
            _, 
            {
                registerInput: { user_name, email, password, confirmPassword }
            }, 
            context, 
            info
        ){
            //TODO: Validate Data
            //TODO: Make sure user already does not exist 
            //TODO: Hash password before saving it and create auth token
            password = await bcrypt.hash(password, 12);
            
            const newUser = new User({
                email,
                user_name,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                user_name: res.user_name
            }, SECRET_KEY, {expiresIn: '1h'});
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
