import {Express, Request, Response, NextFunction} from 'express';

const setCookie = async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.cookie('userId', res.locals.user.id,  {httpOnly: true});
        return next();
      } catch (err) {
        return next({log: 'Error in cookieController setCookie middleware', status: 500, message: err});
      }
    }
    
const checkCookie = async (req: Request, res: Response, next: NextFunction) => {
      try {
          if (!req.cookies.userId){
              return res.redirect('/login');
          }
          return next()
      } catch (err) {
          return next({log: 'Error in cookieController checkCookie middleware', status: 500, message: err})
      }
    }

export {
  setCookie, 
  checkCookie
}