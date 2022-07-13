import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticate(
   req: Request,
   res: Response,
   next: NextFunction
): void {
   try {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET as string);
      next();
   } catch (error) {
      res.statusCode = 401;
      res.send('Unauthorized');
      //should redirct here !
   }
}
