import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { OrderItem } from "@shared/types/OrderItem";
import { TokenService } from "../services/TokenService";
import { OrderItemService } from "../services/OrderItemService";
import { UserHelloResponse } from "@shared/responses/UserHelloResponse";

/** Enumeration to keep track of all the different pages */
enum RouterPage {
    Home = "orderItems",
    Login = "login",
    Register = "register",
    AboutUs = "AboutUs", // New route for About Us
    Shipping = "shipping",
    Returns = "Returns",  // New route for returns
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
            padding: 10px;
            position: relative;
            left: 50px;
        }

        main {
            padding: 10px;
        }

        footer {
            background-color: rgb(18,26,132);
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
        
        /* h3 {
            color: black !important;
        } */

        .footer-section h3 {
    color: white !important;
}

.footer-section, .footer-section p, .footer-section ul, .footer-section ul li, .social-icons img {
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

        
    `;

    @state()
    private _currentPage: RouterPage = RouterPage.Home;

    @state()
    private _isLoggedIn: boolean = false;

    @state()
    private _orderItems: OrderItem[] = [];

    @state()
    public _cartItemsCount: number = 0;

    private _userService: UserService = new UserService();
    private _orderItemService: OrderItemService = new OrderItemService();
    private _tokenService: TokenService = new TokenService();

    private _email: string = "";
    private _password: string = "";
    private _name: string = "";

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
            email: this._email,
            password: this._password,
            name: this._name,
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
            `Hallo ${result.email}!\r\n\r\nJe hebt de volgende producten in je winkelmandje:\r\n- ${
                result.cartItems?.join("\r\n- ") || "Geen"
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
            default:
                contentTemplate = this.renderHome();
        }


        return html`
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
                    ${this.renderLogoutInNav()}
                </nav>
            </header>
            <body>
                <div class="hero-image">
                    <div class="hero-text">
                        <h1 style="font-size:50px">Promotion Banner</h1>
                        <a href="">
                            <button class="button button1">More information</button>
                        </a>
                    </div>
                </div>
            </body>
            <main>${contentTemplate}</main>
            <footer>Copyright &copy; Luca Stars 2024</footer>

            

            <!-- Hier komt de footercode -->
            <footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>Contact</h3>
            <ul>
                <li>Adres: Amstelcampus, Wibautstraat 3b, 1091 GH Amsterdam</li>
                <li>Telefoon: +31 6 12345678 </li>
                <li>E-mail: info@lucastart.nl</li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>About Us</h3>
            <ul>
                <li><a href="/AboutUs">About us</a></li>
                <li><a href="/shipping">Shipping</a></li>
                <li><a href="/returns">Returns</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Follow us</h3>
            <ul class="social-icons">
                <li><a href="#"><img src="/assets/img/fb.png" alt="Facebook"></a></li>
                <li><a href="#"><img src="/assets/img/insta.png" alt="Instagram"></a></li>
                <li><a href="#"><img src="/assets/img/x.png" alt="Twitter"></a></li>
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
            <h1>Welkom op de Luca Stars webshop!</h1>

            ${this._isLoggedIn
                ? nothing
                : html`<p>Je moet ingelogd zijn om producten aan je winkelmandje toe te kunnen voegen!</p>`}

            <div class="order-items">${orderItems}</div>
        `;
    }

    /**
     * Renders a single order item
     *
     * @param orderItem Order item to render
     */
    private renderOrderItem(orderItem: OrderItem): TemplateResult {
        return html`
            <div class="order-item">
                <h2>${orderItem.name}</h2>
                <p>${orderItem.description}</p>
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

                ${this.renderEmail()} ${this.renderPassword()}

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
}
