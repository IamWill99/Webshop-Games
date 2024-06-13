/* eslint-disable @typescript-eslint/no-unused-vars */
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
    public async getAll(): Promise<OrderItem[] | undefined> {
      
        const connection: any = await getConnection();

        let query: string = "SELECT * FROM product;";

        switch (sortOn) {
            case "ASC": {
                query = "SELECT * FROM product ORDER BY name ASC; ";
                break;
            }

            case "DESC": {
                query = "SELECT * FROM product ORDER BY name DESC; ";
                break;
            }

        }


        const response: any[] = await queryDatabase(connection, query, sortOn);



        console.log(response);

        return response;
    }
}