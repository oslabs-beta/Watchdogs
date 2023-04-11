import {Express, Request, Response, NextFunction} from 'express';
const cookieController = {


    setCookie : async (req: Request, res: Response, next: NextFunction) => {
      console.log('in the cookie maker')
        try {
          res.cookie('userId', res.locals.user.id,  {httpOnly: true});
          return next();
        } catch (err) {
          return next({log: 'Error in cookieController setCookie middleware', status: 500, message: err});
        }
      },
}

export default cookieController;