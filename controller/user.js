import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        // finding exisiting old user
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) 
            return res.status(404).json({ message: 'User not found' });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordCorrect) return res.status(404).json({ message: 'Password Incorrect' });
        // if the user is already in database and password is correct then got that user jwt data and sent to frontend
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: '1h'});
        // put the secert code in .env
        // sending result to the frontend
        res.status(200).json({result: existingUser, token})
        console.log('Signin success');
    }  catch (err) {
        res.status(500).json({message: 'token creating is onsuccessful'})
        console.log('Signin unsuccess');
        console.log(err);
        }
}

export const signup = async (req, res) => {
    // adding user to the database
    const {email, password, firstName, lastName, role} = req.body;
    
    try {
        const existingUser = await User.findOne({ email});
        // if user is already exist
        if(existingUser) return res.status(404).json({ message: 'User already exist'})
        // if password dont match
        // if(password !== confirmPassword) return res.status(404).json({ message: 'Password dont match'})
        // hashing the password
        const hashPassword = await bcrypt.hash(password, 12)
        // creating the users
        const result = await User.create({ email, password:hashPassword, name:`${firstName} ${lastName}`, role})

            // if the user is create in database then got that user jwt and sent to frontend
            const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '1h'});

        res.status(200).json({result, token})
        console.log('Signup success');
    } catch (error) {
        res.status(500).json({
            message: 'token creating is onsuccessful'
        })
        console.log(error);
    }
};
