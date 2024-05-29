/**
 * This file represents a database with two tables: User and OrderItem.
 * 
 * It should be noted that this fake database does not directly translate to an actual relational database.
 */
import { OrderItem, UserData } from "@shared/types";

/**
 * User table
 */
export const users: UserData[] = [
    {
        id: 1,
        email: "test@test.nl",
        name: "test",
        password: "$2b$10$GCObbpQrqu1kuaKex6aW8e4SnmC6w8ykffdvLStHNCFq8QECGMzBW", // test
    },
];

/**
 * Order item table
 */
export const orderItems: OrderItem[] = [
    {
        id: 1,
        name: "Lost Memories: Quest of the Forgotten Knight",
        description: "Description 1",
        price: 50,
        imageURLs: [""],
    },
    {
        id: 2,
        name: "The Dragon-Slayer 3000",
        description: "Description 2",
        price: 50,
        imageURLs: [""],
    },
    {
        id: 3,
        name: "Metro 8",
        description: "Description 3",
        price: 50,
        imageURLs: [""],
    },
    {
        id: 4,
        name: "Save The Future",
        description: "Description 4",
        price: 50,
        imageURLs: [""],
    },
];
