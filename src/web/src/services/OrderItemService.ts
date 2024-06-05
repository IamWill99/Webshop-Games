import { OrderItem } from "@shared/types";

/**
 * Handles order item related functionality
 */
export class OrderItemService {
    /**
     * Get all order items
     * 
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async getAll(): Promise<OrderItem[] | undefined> {
        const response: Response = await fetch(`${viteConfiguration.API_URL}orderItems`, {
            method: "get",
        });

        if (!response.ok) {
            console.error(response);

            return undefined;
        }

        return (await response.json()) as OrderItem[];
    }
}


// import { getConnection, queryDatabase } from "../services/DatabaseService";
// import { PoolConnection } from "mysql2/promise";

// interface OrderItem {
//     id: number;
//     orderId: number;
//     productId: number;
//     quantity: number;
//     price: number;
// }

// class OrderItemService {
//     public async getAllOrderItems(): Promise<OrderItem[]> {
//         const connection: PoolConnection = await getConnection();
//         const query: string = "SELECT * FROM product"; 
//         const results: OrderItem[] = await queryDatabase<OrderItem[]>(connection, query);
//         connection.release();
//         return results;
//     }
// }

// export default new OrderItemService();


