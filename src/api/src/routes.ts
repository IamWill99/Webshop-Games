import { Router } from "express";
import { handleTokenBasedAuthentication } from "./middlewares/authenticationMiddleware";
import { UserController } from "./controllers/UserController";
import { OrderItemController } from "./controllers/OrderItemController";
import path from "path";

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

// Deze route dient je HTML-bestand
router.get("/product-details", (_, res) => {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html')); // Zorg dat het pad klopt
});

// Route for fetching product details by ID
router.get("/product/:id", (req, res) => orderItemController.getProductById(req, res));

// New routes for other pages
router.get("/AboutUs-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about us here.");
});
router.get("/shipping-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our shipping.");
});
router.get("/returns-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our returns.");
});
router.get("/product-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our product.");
});
router.get("/admin-root", (_, res) => {
    res.send("Welcome to our webshop! Learn more about our admin.");
});

// NOTE: Everything after this point only works with a valid JWT token!
router.use(handleTokenBasedAuthentication);

router.get("/users/logout", (req, res) => userController.logout(req, res));
router.get("/users/hello", (req, res) => userController.hello(req, res));
router.post("/users/cart/:id", (req, res) => userController.addOrderItemToCart(req, res));
router.get("/orderItems", (req, res) => orderItemController.getAll(req, res));
