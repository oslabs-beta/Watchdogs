import { Express, Request, Response, NextFunction } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { UserDataType, ReqDataType } from '../types.js';

// Creates account
const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, arn, region } = req.body as ReqDataType;
    if (!username.length || !password.length || !arn.length || !region.length) {
      return next({ log: 'Requires all input', status: 500, message: { err: 'Requires all input' } }); // If any fields are blank, exit middleware chain
    }
    const user: UserDataType = await User.create({ username, password, arn, region });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController createAccount middleware.', status: 500, message: err });
  }
};

// Logs in
const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body as ReqDataType;
    const user: UserDataType | null = await User.findOne({ username });
    if (user) {
      const rightPassword: boolean = await bcrypt.compare(password, user.password);
      if (rightPassword) {
        res.locals.user = user;
        res.locals.match = true;
        return next();
      } else res.status(200).json({ message: 'Incorrect username and/or password.' }); // If password is invalid, exit middleware chain 
    } else {
      res.status(200).json({ message: 'No user exists' }); // If user doesnt exist, exit middleware chain
    }
  } catch (err) {
    return next({ log: 'Error in userController logIn middleware.', status: 500, message: err });
  }
};

// Gets user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.cookies;
    const user: UserDataType | null = await User.findOne({ _id: userId });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController getUser middleware.', status: 500, message: err });
  }
};

// Deletes the user account
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body as ReqDataType;
    const user: UserDataType | null = await User.findOneAndDelete({ username });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController deleteUser middleware.', status: 500, message: err });
  }
};

// Update the user's ARN
const addArn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, arn, region } = req.body as ReqDataType;
    const user: UserDataType | null = await User.findOneAndUpdate({ username }, { arn, region }, { new: true });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController addArn middleware.', status: 500, message: err });
  }
};

export { createAccount, logIn, getUser, deleteUser, addArn };
