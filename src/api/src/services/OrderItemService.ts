import { OrderItem } from "@shared/types";
import { getConnection, queryDatabase } from "./DatabaseService";

/**
 * Handles order item related functionality
 */
export class OrderItemService {
    /**
     * Get all order items
     * 
     * @returns A list of all order items when successful, otherwise `undefined`.
     */
    public async getAll(sortOn: any): Promise<OrderItem[] | undefined> {

        const connection: any = await getConnection();

        const response: any[] = await queryDatabase(connection, "SELECT * FROM product ORDER BY name ASC;", sortOn);



        console.log(response);

        return response;
    }
}


