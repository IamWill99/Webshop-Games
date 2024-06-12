import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { OrderItem } from "@shared/types/OrderItem";
import { TokenService } from "../services/TokenService";
import { OrderItemService } from "../services/OrderItemService";
import { UserHelloResponse } from "@shared/responses/UserHelloResponse";
import { PropertyValues, noChange } from "lit";
import { property, query } from "lit/decorators.js";
import { animate } from "@lit-labs/motion";
import { styleMap } from "lit/directives/style-map.js";
//import {styles} from "../styles.js";


/** Enumeration to keep track of all the different pages */
enum RouterPage {
    Home = "orderItems",
    Login = "login",
    Register = "register",
    AboutUs = "AboutUs", // New route for About Us
    Shipping = "shipping",
    Returns = "Returns", // New route for returns
    product = "product", // New route for returns
}

/**
 * Custom element based on Lit for the header of the webshop.
 *
 * @todo Most of the logic in this component is over-simplified. You will have to replace most of if with actual implementions.
 */
@customElement("webshop-root")
export class Root extends LitElement {
    public static styles = css`
            footer {
                color: #ecae20;
            }

            header {
                background-color: #fbfbfa;
                padding-left: 60px;
            }

            main {
                padding: 10px;
            }

            footer {
                background-color: rgb(18, 26, 132);
                padding: 10px;
                text-align: center;
            }

            nav {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            nav .logo img {
                width: auto;
                height: 100px;
                cursor: pointer;
            }

            .form {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .form label {
                display: block;
                margin-bottom: 5px;
            }

            .hero-text {
                text-align: center;
                color: black;
                padding-top: 150px;
            }
            .hero-image {
                background: lightgrey;
                height: 500px;
                background-image: URL("https://lucastars.hbo-ict.cloud/media/acf305d75b7d4e0f8da3f966ee917707/00000006000000000000000000000000.jpeg");
            }

            .button1 {
                background-color: red;
                color: white;
                font-size: 15px;
                border-radius: 50px;
                padding: 10px;
                text-align: center;
                cursor: pointer;
                border-style: solid;
                border-color: red;
            }

            .order-items {
                display: flex;
                justify-content: space-between;
            }

            .footer-section h3 {
                color: white !important;
            }

            .footer-section,
            .footer-section p,
            .footer-section ul,
            .footer-section ul li,
            .social-icons img {
                color: #ecae20 !important;
            }

            .footer-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .footer-section {
                flex: 1;
                border-right: 1px solid white; /* Voeg een witte rand toe aan de rechterkant van elke sectie */
            }

            .footer-section ul {
                list-style: none; /* Verwijder de standaard opsommingstekens */
                padding: 0; /* Verwijder eventuele standaard padding */
            }

            .footer-section ul li {
                margin-bottom: 10px; /* Voeg wat ruimte toe tussen de lijstitems */
            }

            .footer-section ul li a {
                color: #ecae20;
            }

            .social-icons img {
                width: 40px; /* Pas de breedte van de sociale mediapictogrammen aan */
                height: auto; /* Hierdoor schaalt de hoogte automatisch met behoud van de aspectverhouding */
                margin-right: 10px; /* Voeg wat ruimte toe tussen de afbeeldingen */
            }

            .carousel-container {
                width: 100%;
                overflow: hidden;
            }
            .carousel {
                display: flex;
                overflow-x: auto;
                gap: 20px;
                padding: 10px;
                justify-content: space-evenly;
            }
            .game {
                flex: 0 0 auto;
                width: 300px; /* Breedte van elk item aanpassen */
                background-color: #f4f4f4;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .game img {
                max-width: 100%;
                height: auto;
                border-radius: 5px;
                margin-bottom: 10px;    
            }
            .game h3 {
                margin: 0;
                font-size: 18px;
                color: #333;
            }
            .game p {
                font-size: 14px;
                color: #666;
            }
            .game:hover {
                cursor: pointer; /* Cursorstijl veranderen naar wijzende hand wanneer de gebruiker eroverheen gaat */
            }

            .game1 {
                flex: 0 0 auto;
                width: 800px; /* Breedte van elk item aanpassen */
                background-color: rgb(18, 26, 132);
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                color: white;
                margin: 0 auto;
            }
            

            .game1 img {
                max-width: 100%;
                height: auto;
                border-radius: 5px;
                margin-bottom: 10px;
                height: 320px;
                width: 750px;

}

        `;

    @state()
    private _currentPage: RouterPage = RouterPage.Home;

    @state()
    private _isLoggedIn: boolean = false;

    @state()
    private _orderItems: OrderItem[] = [];

    @state()
    public _cartItemsCount: number = 0;

    @state()
    public _Game : number = 0;

    private _userService: UserService = new UserService();
    private _orderItemService: OrderItemService = new OrderItemService();
    private _tokenService: TokenService = new TokenService();

    private _email: string = "";
    private _password: string = "";
    private _name: string = "";
    private _firstName: string = "";

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.getWelcome();
        await this.getOrderItems();
    }

    /**
     * Check if the current token is valid and update the cart item total
     */
    private async getWelcome(): Promise<void> {
        const result: UserHelloResponse | undefined = await this._userService.getWelcome();

        if (result) {
            this._isLoggedIn = true;
            this._cartItemsCount = result.cartItems?.length || 0;
        }
    }

    /**
     * Get all available order items
     */
    private async getOrderItems(): Promise<void> {
        const result: OrderItem[] | undefined = await this._orderItemService.getAll();

        if (!result) {
            return;
        }

        this._orderItems = result;
    }

    /**
     * Handler for the login form
     */
    private async submitLoginForm(): Promise<void> {
        // TODO: Validation

        const result: boolean = await this._userService.login({
            email: this._email,
            password: this._password,
        });

        if (result) {
            alert("Succesfully logged in!");

            await this.getWelcome();

            this._currentPage = RouterPage.Home;
        } else {
            alert("Failed to login!");
        }
    }

    /**
     * Handler for the register form
     */
    private async submitRegisterForm(): Promise<void> {
        // TODO: Validation

        const result: boolean = await this._userService.register({
            username: this._name,
            email: this._email,
            password: this._password,
            repeatPassword: "",
            firstName: "",
            lastName: "",
            name: ""
        });

        if (result) {
            alert("Succesfully registered!");

            this._currentPage = RouterPage.Login;
        } else {
            alert("Failed to register!");
        }
    }


    
    /**
     * Handler for the cart button
     */
    private async clickCartButton(): Promise<void> {
        const result: UserHelloResponse | undefined = await this._userService.getWelcome();

        if (!result) {
            return;
        }

        this._cartItemsCount = result.cartItems?.length || 0;

        alert(
            `Hallo ${result.email}!\r\n\r\nJe hebt de volgende producten in je winkelmandje:\r\n- ${result.cartItems?.join("\r\n- ") || "Geen"
            }`
        );
    }

    /**
     * Handler for the logout button
     */
    private async clickLogoutButton(): Promise<void> {
        await this._userService.logout();

        this._tokenService.removeToken();

        this._isLoggedIn = false;
    }

    /**
     * Handler for the "Add to cart"-button
     *
     * @param orderItem Order item to add to the cart
     */
    private async addItemToCart(orderItem: OrderItem): Promise<void> {
        const result: number | undefined = await this._userService.addOrderItemToCart(orderItem.id);

        if (!result) {
            return;
        }

        this._cartItemsCount = result;
    }

    /**
     * Renders the components
     */
    protected render(): TemplateResult {
        let contentTemplate: TemplateResult;

        switch (this._currentPage) {
            case RouterPage.Login:
                contentTemplate = this.renderLogin();
                break;
            case RouterPage.Register:
                contentTemplate = this.renderRegister();
                break;
            case RouterPage.AboutUs: // Nieuwe case voor About Us
                contentTemplate = html`<aboutus-root></aboutus-root>`;
                break;
            case RouterPage.Shipping: // Nieuwe case voor shipping
                contentTemplate = html`<shipping-root></shipping-root>`;
                break;
            case RouterPage.Returns: // Nieuwe case voor returns
                contentTemplate = html`<returns-root></returns-root>`;
                break;
            case RouterPage.product: // Nieuwe case voor product
                contentTemplate = html`<product-root></product-root>`;
                break;
            default:
                contentTemplate = this.renderHome();
        }

        return html`
                <head>
                    <link
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                        rel="stylesheet"
                    />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <header>
                    <nav>
                        <div
                            class="logo"
                            @click=${(): void => {
                this._currentPage = RouterPage.Home;
            }}
                        >
                            <img src="/assets/img/logo.png" alt="Logo" />
                        </div>

                        ${this.renderLoginInNav()} ${this.renderRegisterInNav()} ${this.renderCartInNav()}
                        ${this.renderLogoutInNav()}  ${this.renderGameNav()} 
                    </nav>
                    
                </header>
                <main>${contentTemplate}</main>
                <footer>Copyright &copy; Luca Stars 2024</footer>

                <!-- Hier komt de footercode -->
                <footer>
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Contact</h3>
                            <ul>
                                <li>Adres: Amstelcampus, Wibautstraat 3b, 1091 GH Amsterdam</li>
                                <li>Telefoon: +31 6 12345678</li>
                                <li>E-mail: info@lucastart.nl</li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>We are happy to help you</h3>
                            <ul>
                                <li><a href="/shipping">Shipping</a></li>
                                <li><a href="/returns">Returns</a></li>
                                <li><a  @click=${(): void => {
                                         this._currentPage = RouterPage.product;
                                    }}>
                                    Products</a></li>
                            </ul>
                        </div>

                        <div class="footer-section">
                            <h3>About Us</h3>
                            <ul>
                                <li><a href="/AboutUs">About us</a></li>
                            </ul>
                        </div>

                    <div class="footer-section">
                        <h3>Follow us</h3>
                        <ul class="social-icons">
                            <li>
                                <a href="https://www.facebook.com/"><img src="/assets/img/fb.png" alt="Facebook" /></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/"><img src="/assets/img/insta.png" alt="Instagram" /></a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com/"><img src="/assets/img/x.png" alt="Twitter" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * Renders the home page, which contains a list of all order items.
     */
    private renderHome(): TemplateResult {
        const orderItems: TemplateResult[] = this._orderItems.map((e) => this.renderOrderItem(e));

        if (orderItems.length === 0) {
            return html`<div class="order-items">Laden... Even geduld alstublieft.</div> `;
        }

        return html`
            <body>
                <div class="hero-image">
                    <div class="hero-text">
                        <h1 style="font-size:50px">Promotion Banner</h1>
                        <a href="product.html"><button class="button button1">More information</button></a>
                    </div>
                </div>
                <div class="carousel-container">
                    <div class="carousel">
                    <!-- Voeg hier de games toe -->
                        <div class="game" onclick="window.location.href = 'https://goozoovooguu46-pb3b2324.hbo-ict.cloud/'">
                            <img src="https://lucastars.hbo-ict.cloud/media/7da176806505408c88b0d5f16f000a7b/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
                            <h3>Lost Memories: Quest of the Forgotten Knight</h3>
                            <p>In a realm of magic and mystery, an unnamed protagonist sets out on a quest to find the lost damsel, aided by strange artifacts and unexpected allies. Through forests, caves, and cliffs, he uncovers fragments of his forgotten memories.</p>
                        </div>
                        <!-- Voeg hier de andere games toe -->
                        <div class="game" onclick="window.location.href = 'https://gooriixuutuu25-pb3a2324.hbo-ict.cloud/'">
                            <img src="https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png" alt="The dragon-Slayer 3000">
                            <h3>The dragon-Slayer 3000</h3>
                            <p>Bij deze game ga je met een van de drie characters op pad met je party om de draak te verslaan.\nKun jij het gevaar aan?</p>
                        </div>
                        <div class="game" onclick="window.location.href = 'https://huucuucaacoo61-pb3a2324.hbo-ict.cloud/'">
                            <img src="https://lucastars.hbo-ict.cloud/media/f517798d34f14abcb65bee7386ef38dd/00000006000000000000000000000000.png" alt="Metro 8">
                            <h3>Metro 8</h3>
                            <p>In dit spel bevind je je in een spannende wereld van ondergrondse tunnels en metrostations. Gewapend met slechts je eigen verstand en doorzettingsvermogen, moet je navigeren door een uitgestrekt metronetwerk. Het spel is een doolhof, met verborgen paden, puzzels en obstakels die je moet overwinnen om verder te komen. Terwijl je dieper de duistere gangen verkent, ontdek je geheimen en uitdagingen die je vaardigheden op de proef stellen. Durf jij de weg te vinden en te ontsnappen uit dit ondergrondse labyrint?</p>
                        </div>
                        <div class="game" onclick="window.location.href = 'https://muufuugeecaa69-pb3b2324.hbo-ict.cloud/'">
                            <img src="https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
                            <h3>Save The Future</h3>
                            <p>Are you able to save the future of mankind?\n\nIf you like science, logical thinking and wine you should give it a go...</p>
                        </div>
                    </div>
                </div>
                <br><br>
                <style>
                    body {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        font-family: sans-serif;
                    }

                    #carousel {
                        display: flex;
                        width: 800px;
                        height: 500px;
                        user-select: none;
                        margin: 0 auto;
                    }

                    #carousel:not(:defined) > * {
                        display: none;
                    }

                </style>
            <motion-carousel id="carousel">
                

                <div class="game1">
                    <img src="https://lucastars.hbo-ict.cloud/media/7da176806505408c88b0d5f16f000a7b/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
                    <h3>Lost Memories: Quest of the Forgotten Knight</h3> <br>
                    <a href="product.html" class="button1">Product page</a>
                </div>
                <div class="game1">
                    <img src="https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png" alt="The dragon-Slayer 3000">
                    <h3>The dragon-Slayer 3000</h3><br>
                    <a href="product.html" class="button1">Product page</a>
                </div>
                <div class="game1">
                    <img src="https://lucastars.hbo-ict.cloud/media/f517798d34f14abcb65bee7386ef38dd/00000006000000000000000000000000.png" alt="Metro 8">
                    <h3>Metro 8</h3><br>
                    <a href="product.html" class="button1">Product page</a>
                </div>
                <div class="game1">
                    <img src="https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
                    <h3>Save The Future</h3><br>
                    <a href="product.html" class="button1">Product page</a>
                </div>
                <div class="game1">
                    <img src="https://lucastars.hbo-ict.cloud/media/3fcbea3f2e3b4818ba8e1b0584550df0/00000006000000000000000000000000.png" >
                    <h3>Lost Girl</h3><br>
                    <a href="product.html" class="button1">Product page</a>
                </div>

            </motion-carousel>
            <h1></h1>
            ${this._isLoggedIn
                ? nothing
                : html`<p></p>`}

                <div class="order-items">${orderItems}</div>
            </body>
            `;
    }

    /**
     * Renders a single order item
     *
     * @param orderItem Order item to render
     */
    private renderOrderItem(orderItem: OrderItem): TemplateResult {
        console.log (orderItem);
        return html`
            <div class="order-item">
                <h2>${orderItem.title}</h2>
                <p>${orderItem.description}</p>

                 <img src="${orderItem.image}" alt="${orderItem.title}">
                ${this._isLoggedIn
                    ? html`<button @click=${async (): Promise<void> => await this.addItemToCart(orderItem)}>
                          Toevoegen aan winkelmandje
                      </button>`
                    : nothing}
            </div>
        `;
    }

    /**
     * Renders the login page
     */
    private renderLogin(): TemplateResult {
        return html`
                <div class="form">
                    ${this.renderEmail()} ${this.renderPassword()}

                    <div>
                        <button @click="${this.submitLoginForm}" type="submit">Inloggen</button>
                    </div>

                    <div>
                        Of
                        <button
                            @click="${(): void => {
                this._currentPage = RouterPage.Register;
            }}"
                        >
                            Registreer
                        </button>
                        je door hier te klikken.
                    </div>
                </div>
            `;
    }

    /**
     * Renders the register page
     */
    private renderRegister(): TemplateResult {
        return html`
                <div class="form">
                    <div>
                        <label for="username">Naam</label>
                        <input type="text" id="name" value=${this._name} @change=${this.onChangeName} />
                    </div>

                    ${this.renderEmail()} ${this.renderPassword()} ${this.renderFirstName()}

                    <div>
                        <button @click="${this.submitRegisterForm}" type="submit">Registreer</button>
                    </div>

                    <div>
                        Of
                        <button
                            @click="${(): void => {
                this._currentPage = RouterPage.Login;
            }}"
                        >
                            Login
                        </button>
                        door hier te klikken.
                    </div>
                </div>
            `;
    }

    /**
     * Renders the login button in the navigation
     */
    private renderLoginInNav(): TemplateResult {
        if (this._isLoggedIn) {
            return html``;
        }

        return html`<div
                @click=${(): void => {
                this._currentPage = RouterPage.Login;
            }}
            >
                <button>Inloggen</button>
            </div>`;
    }

    /**
     * Renders the register button in the navigation
     */
    private renderRegisterInNav(): TemplateResult {
        if (this._isLoggedIn) {
            return html``;
        }

        return html` <div
                @click=${(): void => {
                this._currentPage = RouterPage.Register;
            }}
            >
                <button>Registreren</button>
            </div>`;
    }

    /**
     * Renders the cart button in the navigation
     */
    private renderCartInNav(): TemplateResult {
        if (!this._isLoggedIn) {
            return html``;
        }

        return html`<div @click=${this.clickCartButton}>
                <button>Winkelmandje (${this._cartItemsCount} producten)</button>
            </div>`;
    }

    /**
     * Renders the logout button in the navigation
     */
    private renderLogoutInNav(): TemplateResult {
        if (!this._isLoggedIn) {
            return html``;
        }

        return html`
                <div @click=${this.clickLogoutButton}>
                    <button>Logout</button>
                </div>
            `;
    }

    private renderGameNav(): TemplateResult {
        if (this._Game) {
            return html``;
        }

        return html`<div
                @click=${(): void => {
                this._currentPage = RouterPage.product;
            }}
            >
                <button>Game</button>
            </div>`;
    }


    /**
     * Renders the e-mail input field with change-tracking
     */
    private renderEmail(): TemplateResult {
        return html`<div>
                <label for="email">E-mail</label>
                <input
                    type="text"
                    name="email"
                    placeholder="test@test.nl"
                    value=${this._email}
                    @change=${this.onChangeEmail}
                />
            </div>`;
    }

    /**
     * Renders the password input field with change-tracking
     */
    private renderPassword(): TemplateResult {
        return html`<div>
                <label for="password">Wachtwoord</label>
                <input type="password" value=${this._password} @change=${this.onChangePassword} />
            </div>`;
    }

    private renderFirstName(): TemplateResult {
        return html`<div>
        <label for="firstName">Firstname</label>
        <input type="text" value=${this._firstName} @change=${this.onChangeFirstName} />
    </div>`;
    }

    /**
     * Handles changes to the e-mail input field
     */
    private onChangeEmail(event: InputEvent): void {
        this._email = (event.target as HTMLInputElement).value;
    }

    /**
     * Handles changes to the password input field
     */
    private onChangePassword(event: InputEvent): void {
        this._password = (event.target as HTMLInputElement).value;
    }

    /**
     * Handles changes to the name input field
     */
    private onChangeName(event: InputEvent): void {
        this._name = (event.target as HTMLInputElement).value;
    }

    private onChangeFirstName(event: InputEvent): void {
        this._firstName = (event.target as HTMLInputElement).value;
    }
}



//import {css} from "lit";

const styles: ReturnType<typeof css> = css`
    :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
        /* Defaults */
        width: 300px;
        height: 200px;
        border-radius: 10px;
        background: gainsboro;
        cursor: pointer;

    }


    .fit {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .selected {
        top: -100%;
    }

    ::slotted(*) {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .bar {
        position: absolute;
        bottom: 25px;
        width: calc(100% - 16px);
        left: 8px;
        height: 20px;
        background: rgba(200, 200, 200, 0.5);
        border-radius: 8px;
        pointer-events: none;

    }

    .indicator {
        position: relative;
        display: inline-block;
        height: 100%;
        width: 8px;
        border-radius: 8px;
        background: #ecae20;
    }
    `;


@customElement("motion-carousel")
export class MotionCarousel extends LitElement {
    public static styles = styles;

    @query("slot[name=\"selected\"]", true)
    private selectedSlot!: HTMLSlotElement;

    @query("slot[name=\"previous\"]", true)
    private previousSlot!: HTMLSlotElement;

    @property({ type: Number })
    public selected = 0;

    private left = 0;
    private selectedInternal = 0;

    public get maxSelected(): number {
        return this.childElementCount - 1;
    }

    public hasValidSelected(): boolean {
        return this.selected >= 0 && this.selected <= this.maxSelected;
    }

    public render(): ReturnType<typeof html> {
        const p: number = this.selectedInternal;
        const s: number = (this.selectedInternal =
            this.hasValidSelected() ? this.selected : this.selectedInternal);
        const shouldMove: boolean = this.hasUpdated && s !== p;
        const atStart: boolean = p === 0;
        const toStart: boolean = s === 0;
        const atEnd: boolean = p === this.maxSelected;
        const toEnd: boolean = s === this.maxSelected;
        const shouldAdvance: boolean = shouldMove &&
            (atEnd ? toStart : atStart ? !toEnd : s > p);
        const delta: number = (shouldMove ? Number(shouldAdvance) || -1 : 0) * 100;
        this.left -= delta;
        const animateLeft: string = `${this.left}%`;
        const selectedLeft: string = `${-this.left}%`;
        const previousLeft: string = `${-this.left - delta}%`;
        const w: number = 100 / this.childElementCount;
        const indicatorLeft: string = `${w * s}%`;
        const indicatorWidth: string = `${w}%`;
        return html`
        <div class="fit"
            ${animate()}
            @click=${this.clickHandler}
            style=${styleMap({ left: animateLeft })}>
            <div class="fit" style=${shouldMove ? styleMap({ left: previousLeft }) : noChange
            }>
            <slot name="previous"></slot>
            </div>
            <div class="fit selected" style=${shouldMove ? styleMap({ left: selectedLeft }) : noChange
            }>
            <slot name="selected"></slot>
            </div>
        </div>
        <div class="bar"><div class="indicator"
            ${animate()}
            style=${styleMap({ left: indicatorLeft, width: indicatorWidth })}></div></div>
        `;
    }

    private previous = -1;

    protected updated(changedProperties: PropertyValues): void {
        if ((changedProperties.has("selected") || this.previous === -1) && this.hasValidSelected()) {
            this.updateSlots();
            this.previous = this.selected;
        }
    }

    private updateSlots(): void {
        // unset old slot state
        this.selectedSlot.assignedElements()[0]?.removeAttribute("slot");
        this.previousSlot.assignedElements()[0]?.removeAttribute("slot");
        // set slots
        this.children[this.previous]?.setAttribute("slot", "previous");
        this.children[this.selected]?.setAttribute("slot", "selected");
    }

    private clickHandler(e: MouseEvent): void {
        const i: number = this.selected + (Number(!e.shiftKey) || -1);
        this.selected = i > this.maxSelected ? 0 : i < 0 ? this.maxSelected : i;
        const change: CustomEvent<number> = new CustomEvent("change",
            { detail: this.selected, bubbles: true, composed: true });
        this.dispatchEvent(change);
    }
}

