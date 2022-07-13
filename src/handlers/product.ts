import { Request, Response } from 'express';
import { ProductModel } from '../models/product';

export class ProductHandler {
   private store = new ProductModel();

   async index(_req: Request, res: Response): Promise<void> {
      try {
         const pros = await this.store.index();
         res.statusCode = 200;
         res.json(pros);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle index: ${error}`));
      }
   }

   async show(req: Request, res: Response): Promise<void> {
      try {
         const pro = await this.store.show(req.params.id);
         res.statusCode = 200;
         res.json(pro);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle show: ${error}`));
      }
   }

   async create(req: Request, res: Response): Promise<void> {
      const newpro = {
         name: req.body.name,
         price: req.body.price,
         category: req.body.category,
      };
      try {
         const pro = await this.store.create(newpro);
         res.statusCode = 200;
         res.json(pro);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle create: ${error}`));
      }
   }

   async edit(req: Request, res: Response): Promise<void> {
      const newpro = {
         id: req.params.id,
         name: req.body.name,
         price: req.body.price,
         category: req.body.category,
      };
      try {
         const pro = await this.store.edit(newpro);
         res.statusCode = 200;
         res.json(pro);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle edit: ${error}`));
      }
   }

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const pro = await this.store.delete(req.params.id);
         res.statusCode = 200;
         res.json(pro);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete: ${error}`));
      }
   }

   async deleteAll(_req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.deleteAll();
         res.statusCode = 200;
         res.send(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete All: ${error}`));
      }
   }

   async productsByCategory(req: Request, res: Response): Promise<void> {
      try {
         const pros = await this.store.productsByCategory(req.params.category);
         res.statusCode = 200;
         res.json(pros);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle productsByCategory: ${error}`));
      }
   }

   async mostPopularproducts(_req: Request, res: Response): Promise<void> {
      try {
         const pros = await this.store.mostPopularproducts();
         res.statusCode = 200;
         res.json(pros);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle mostPopularproducts: ${error}`));
      }
   }
}
