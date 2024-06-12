import { Request, Response } from "express";
import { OrderItemService } from "../services/OrderItemService";


/**
 * Handles all endpoints related to the Order Item resource
 */
export class OrderItemController {
  
    /**
     * Get all order items
     * 
     * @param _ Request object (unused)
     * @param res Response object
     */
    public async getAll(_req: Request, res: Response): Promise<void> {
        const sortOn: string = (_req.query.sort as string);

        console.log("Query?", sortOn);

        const service: any = new OrderItemService();

        const result: any = await service.getAll(sortOn);

        res.json(result);
    }
}

