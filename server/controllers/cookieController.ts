import { Express, Request, Response, NextFunction } from 'express';

// Creating cookie using the userId
const setCookie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('userId', res.locals.user.id, { httpOnly: true });
    return next();
  } catch (err) {
    return next({ log: 'Error in cookieController setCookie middleware', status: 500, message: err });
  }
};

// Checking if the cookie exists
const checkCookie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // If no cookie exists, redirect to login page
    if (!req.cookies.userId) {
      return res.redirect('/login');
    }
    return next();
  } catch (err) {
    return next({ log: 'Error in cookieController checkCookie middleware', status: 500, message: err });
  }
};

// Deleting the cookie from the session on log out or account deletion
const deleteCookie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('userId');
    return next();
  } catch (err) {
    return next({ log: 'Error in cookieController deleteCookie middleware', status: 500, message: err });
  }
};

export { setCookie, checkCookie, deleteCookie };
