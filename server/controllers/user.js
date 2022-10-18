//necessary imports are made

import bcrypt from 'bcryptjs';//to hash the password in order to encrypt and secure the passwords in the database
import jwt from 'jsonwebtoken'; //json web token used for user authentication purposes
import User from '../models/user.js';
import router from '../routes/posts.js';

//asynchronous request response function for when a user signs in
export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
    
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong..'})
        
    }

}
//asynchronous request response function for when a user signs up
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists."});
        if(password !== confirmPassword) return res.status(400).json({ message: "The passwords don't match :/"});
        //hashing of passwords for encryption and security purposes
        const hashedPassword = await bcrypt.hash(password, 8);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong..'});

        
    }
}

export default router;