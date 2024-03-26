import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
dotenv.config();
const client = new OAuth2Client("236629896745-fvh6il2sk8fik7fn8fas89b1l3h93git.apps.googleusercontent.com");
const secret = 'test';

//sign in
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ error:'auth-missing' });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({error:'invalid-credentials' });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "1h" });
   
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//sign up
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ error:'user-exist' });
    
    if(password !==confirmPassword) return res.status(400).json({ error:'password-not-match' });
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};


export const googleSignIn = async (req, res) => {
  const { token }  = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '236629896745-fvh6il2sk8fik7fn8fas89b1l3h93git.apps.googleusercontent.com', // Use your Google Client ID here
    });
    const { name, email, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, name, password: bcrypt.hashSync(email + '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', 12), profilePicture: picture });
    }
    const customToken = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });
   
    res.status(200).json({ result: user,  token: customToken });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};