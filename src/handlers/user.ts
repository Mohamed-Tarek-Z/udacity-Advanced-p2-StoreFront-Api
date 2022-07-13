import { Request, Response } from 'express';
import { UserModel } from '../models/user';
import jwt from 'jsonwebtoken';

export class UserHandler {
   private store = new UserModel();

   async index(_req: Request, res: Response): Promise<void> {
      try {
         const users = await this.store.index();
         res.statusCode = 200;
         res.json(users);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle index: ${error}`));
      }
   }

   async show(req: Request, res: Response): Promise<void> {
      try {
         const user = await this.store.show(req.params.id);
         res.statusCode = 200;
         res.json(user);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle show: ${error}`));
      }
   }

   async create(req: Request, res: Response): Promise<void> {
      const newuser = {
         user_name: req.body.user_name,
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         password: req.body.password,
      };
      try {
         const user = await this.store.create(newuser);
         res.statusCode = 200;
         res.json(jwt.sign(user, process.env.TOKEN_SECRET as string));
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle create: ${error}`));
      }
   }

   async edit(req: Request, res: Response): Promise<void> {
      const newuser = {
         user_name: req.body.user_name,
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         password: req.body.password,
      };
      try {
         const user = await this.store.edit(newuser);
         res.statusCode = 200;
         res.json(user);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle edit: ${error}`));
      }
   }

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const user = await this.store.delete(req.params.id);
         res.statusCode = 200;
         res.send(user);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete: ${error}`));
      }
   }

   async deleteAll(req: Request, res: Response): Promise<void> {
      try {
         const user = await this.store.deleteAll();
         res.statusCode = 200;
         res.send(user);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete: ${error}`));
      }
   }

   async authenticate(req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.authenticate(
            req.body.user_name,
            req.body.password
         );
         res.statusCode = 200;
         if (typeof re != 'string')
            res.json(jwt.sign(re, process.env.TOKEN_SECRET as string));
         else res.send(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle authenticate: ${error}`));
      }
   }
}
