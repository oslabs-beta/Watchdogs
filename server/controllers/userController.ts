import { Express, Request, Response, NextFunction } from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, arn, region } = req.body;
    // const check = await User.findOne({username: username})
    // if (check){
    //   res.locals.exists = true;
    // } else
    if (!username.length || !password.length || !arn.length || !region.length) {
      return next({ log: 'Requires all input', status: 500, message: { err: 'Requires all input' } });
    }
    const user = await User.create({ username: username, password: password, arn: arn, region: region });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController createAccount middleware.', status: 500, message: err });
  }
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (rightPassword) {
        res.locals.user = user;
        res.locals.match = true;
        return next();
      } else res.status(200).json({ message: 'Incorrect username and/or password.' });
    }
  } catch (err) {
    return next({ log: 'Error in userController logIn middleware.', status: 500, message: err });
  }
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.cookies;
    const user = await User.findOne({ _id: userId });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController getUser middleware.', status: 500, message: err });
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndDelete({ username: username });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController deleteUser middleware.', status: 500, message: err });
  }
};
const addArn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, arn, region } = req.body;
    const user = await User.findOneAndUpdate({ username }, { arn: arn, region: region }, { new: true });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({ log: 'Error in userController addArn middleware.', status: 500, message: err });
  }
};

export { createAccount, logIn, getUser, deleteUser, addArn };
