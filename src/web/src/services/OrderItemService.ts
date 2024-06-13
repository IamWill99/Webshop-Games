import { OrderItem } from "@shared/types";

/**
 * Handles order item related functionality
 */
export class OrderItemService {
    [x: string]: any;
    /**
     * Get all order items
     * 
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async getAll(sortingOrder: string): Promise<OrderItem[] | undefined> {
            
        const response: Response = await fetch(`${ viteConfiguration.API_URL }orderItems?sort=${sortingOrder}`, {

            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
}