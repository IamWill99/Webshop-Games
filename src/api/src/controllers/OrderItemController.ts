import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {OrderItemService} from "../services/OrderItemService";


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
    public async getAll(_: Request, res: Response): void {

        const service: any = new OrderItemService();

        const result: any = await service.getAll();

        res.json(result);
    }
}
