const User = require('../models/User');
const bycrypt = require('bcryptjs');
const userToken = require('../utils/generateToken')

//Handel Error
const {UserInputError} = require('apollo-server');
const {validateRegisterInput, validateLoginInput} = require('../utils/validator');



module.exports = {
    Mutation: {
        async login(_,{userName, password}) {
            const {errors, valid} = validateLoginInput(userName, password);
            const user = await User.findOne({userName});

            if(!valid) {
                throw new UserInputError('Errors', {errors});
            }

            if(!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bycrypt.compare(password, user.password);

            if(!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors});
            }
            
            const token = userToken.defaultToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
           
        },
        async register(_,
            {
                signup: { userName, email, password, confirmPassword} //args
                
            }/*, context, info*/) {
                const {valid, errors} = validateRegisterInput(
                    userName,
                    email,
                    password,
                    confirmPassword
                );

                 if(!valid) {
                     throw new UserInputError('Errors', {errors});
                 }   

                const user = await User.findOne({userName});

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

                const token = userToken.defaultToken(result)

                // Return data in localhost:5000 saved in mongodb
                return {
                    ...result._doc,
                    id: result._id,
                    token
                }
        }
    }
}
