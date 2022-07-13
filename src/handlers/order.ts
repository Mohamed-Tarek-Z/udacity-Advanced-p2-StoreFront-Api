import { Request, Response } from 'express';
import { OrderModel } from '../models/order';

export class OrderHandler {
   private store = new OrderModel();

   async index(_req: Request, res: Response): Promise<void> {
      try {
         const orders = await this.store.index();
         res.statusCode = 200;
         res.json(orders);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle index: ${error}`));
      }
   }

   async show(req: Request, res: Response): Promise<void> {
      try {
         const order = await this.store.show(req.params.id);
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle show: ${error}`));
      }
   }

   async create(req: Request, res: Response): Promise<void> {
      const neworder = {
         user_id: req.body.user_id,
         status: req.body.status,
      };
      try {
         const order = await this.store.create(neworder);
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle create: ${error}`));
      }
   }

   async edit(req: Request, res: Response): Promise<void> {
      const neworder = {
         user_id: req.body.user_id,
         status: req.body.status,
      };
      try {
         const order = await this.store.edit(neworder);
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle edit: ${error}`));
      }
   }

   async delete(req: Request, res: Response): Promise<void> {
      try {
         const order = await this.store.delete(req.params.id);
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete: ${error}`));
      }
   }

   async deleteAll(_req: Request, res: Response): Promise<void> {
      try {
         await this.store.deleteAll();
         res.statusCode = 200;
         res.send('deleted All orders');
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle delete All: ${error}`));
      }
   }

   async currentOrderByUser(req: Request, res: Response): Promise<void> {
      try {
         const order = await this.store.currentOrderByUser(req.params.user_id);
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle currentOrderByUser: ${error}`));
      }
   }

   async completedOrdersByUser(req: Request, res: Response): Promise<void> {
      try {
         const order = await this.store.completedOrdersByUser(
            req.params.user_id
         );
         res.statusCode = 200;
         res.json(order);
      } catch (error) {
         res.statusCode = 400;
         res.json(new Error(`Could not handle currentOrderByUser: ${error}`));
      }
   }

   async addProduct(req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.addProduct({
            order_id: req.params.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
         });
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }

   async editProductInOrder(req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.editOrder_Product({
            id: req.params.op_id,
            order_id: req.params.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
         });
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }

   async removeRecordFromOrderProduct(
      req: Request,
      res: Response
   ): Promise<void> {
      try {
         const re = await this.store.removeRecordFromOrder_Product(
            req.params.op_id
         );
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }

   async removeAllProductsInOrder(req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.removeAllProductsInOrder(
            req.params.order_id
         );
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }

   async GetAllOfOrder_Prod(_req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.GetAllOfOrder_Prod();
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         console.log('my error');
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }

   async clear_orderproducts(_req: Request, res: Response): Promise<void> {
      try {
         const re = await this.store.clear_orderproducts();
         res.statusCode = 200;
         res.json(re);
      } catch (error) {
         res.statusCode = 400;
         res.json(
            new Error(`Could not handle completedOrdersByUser: ${error}`)
         );
      }
   }
}
