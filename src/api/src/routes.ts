import { Router } from "express";
import { handleTokenBasedAuthentication } from "./middlewares/authenticationMiddleware";
import { UserController } from "./controllers/UserController";
import { OrderItemController } from "./controllers/OrderItemController";

export const router: Router = Router();

const userController: UserController = new UserController();
const orderItemController: OrderItemController = new OrderItemController();

router.get("/", (_, res) => {
    res.send("Hello, this is a simple webshop API.");
});

router.post("/users/register", (req, res) => userController.register(req, res));
router.post("/users/login", (req, res) => userController.login(req, res));
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/orderItems",  (req, res) => orderItemController.getAll(req, res));

// New route for"About Us"-page
router.get("/AboutUs-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about us here.");
});

// New route for "shipping"-page
router.get("/shipping-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our shipping.");
});

// New route for "returns"-page
router.get("/returns-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our returns.");
});

// New route for "product"-page
router.get("/product-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our product.");
});

// New route for "admin"-page
router.get("/returns-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our returns.");
});


// NOTE: Everything after this point only works with a valid JWT token!
router.use(handleTokenBasedAuthentication);

router.get("/users/logout", (req, res) => userController.logout(req, res));
router.get("/users/hello", (req, res) => userController.hello(req, res));
router.post("/users/cart/:id", (req, res) => userController.addOrderItemToCart(req, res));
