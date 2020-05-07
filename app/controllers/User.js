const User = require('../models/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/key.config').SECRET_KEY;
//Handel Error
const {UserInputError} = require('apollo-server');

module.exports = {
    Mutation: {
        async register(_,
            {
                signup: { userName, email, password, confirmPassword} //args
                
            }/*, context, info*/) {
                
                const user = User.findOne({userName});

                if(user) {
                    throw new UserInputError('Username is taken', {
                        errors:{
                            username: 'This username is taken'
                        }
                    });
                }

                password = await bycrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    userName,
                    password,
                });
                const result = await newUser.save();

                const token = jwt.sign({
                    id : result.id,
                    email : result.email,
                    userName: result.userName
                },secretKey, {expiresIn : '1h'});

                // Return data in localhost:5000 saved in mongodb
                return {
                    ...result._doc,
                    id: result._id,
                    token
                }
        }
    }
}