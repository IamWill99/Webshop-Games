import { Request, Response } from "express";
import {OrderItemService} from "../services/OrderItemService";


/**
 * Handles all endpoints related to the Order Item resource
 */
export class OrderItemController {
    getProductById: any;
    /**
     * Get all order items
     * 
     * @param _ Request object (unused)
     * @param res Response object
     */
    public async getAll(_: Request, res: Response): Promise<void> {

        const service: any = new OrderItemService();

        const result: any = await service.getAll();

        res.json(result);
    }
}
