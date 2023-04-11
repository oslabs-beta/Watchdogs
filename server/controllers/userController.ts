import {Express, Request, Response, NextFunction} from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

const userController = {

    createAccount : async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, password, arn} = req.body;
            const newUser = await User.create({username: username, password: password, arn: arn});
            res.locals.newUser = newUser;
            return next()
        } catch (err) {
            return next({log: 'Error in userController createAccount middleware.', status: 500, message: err})
        }
    },

    logIn : async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username: username});
            if (user) {
                const rightPassword = await bcrypt.compare(password, user.password);
                if (rightPassword) {
                    res.locals.user = user
                    return next();
                }
                else res.status(200).json({message: 'Incorrect username and/or password.'})
             }
              
        } catch (err){
            return next({log: 'Error in userController logIn middleware.', status: 500, message: err})
        }
    }, 
    getUser : async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {username} = req.body;
          const user = await User.findOne({username: username})
          res.locals.user = user;
          return next()
        } catch (err){
            return next({log: 'Error in userController getUser middleware.', status: 500, message: err})
        }
    },
    addArn : async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {username, arn} = req.body;
            const user = await User.findOneAndUpdate({ username }, { arn: arn }, { new: true });
            res.locals.user = user;
            return next()
        } catch (err){
            return next({log: 'Error in userController addArn middleware.', status: 500, message: err})
        }
    } 

}

export default userController;