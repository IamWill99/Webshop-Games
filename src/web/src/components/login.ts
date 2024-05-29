import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { UserHelloResponse } from "@shared/responses/UserHelloResponse";
import { RouterPage } from "./Routerpage";
import "./CustomInputElement.ts";

/**
 * Custom element based on Lit for the header of the webshop.
 *
 * @todo Most of the logic in this component is over-simplified. You will have to replace most of if with actual implementions.
 */
@customElement("webshop-login")
export class Login extends LitElement {
    public static styles = css`

        .form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .error {
            color: red;
        }
        
    `;

    public _isLoggedIn: boolean = false;

    @state() private _userService: UserService = new UserService();

    @state() private _email: string = "";
    @state() private _password: string = "";

    @state() private _emailError: string | null = null;
    @state() private _visibleErrorEmail: boolean = false;

    @state() private _passwordError: string | null = null;
    @state() private _visibleErrorPassword: boolean = false;

    public async connectedCallback(): Promise<void> {
        super.connectedCallback();

        await this.getWelcome();
    }

    /**
     * Check if the current token is valid and update the cart item total
     */
    private async getWelcome(): Promise<void> {
        const result: UserHelloResponse | undefined = await this._userService.getWelcome();

        if (result) {
            this._isLoggedIn = true;
        }
    }

    /**
     * Handler for the login form
     */
    private async submitLoginForm(): Promise<void> {

        // TODO: Validation

        // Perform login
        const result: boolean = await this._userService.login({
            email: this._email,
            password: this._password,
        });

        // Handle login result
        if (result) {
            alert("Successfully logged in!");
            location.reload();
            await this.getWelcome();
            this.navigateTo(RouterPage.Home);
        } else {

            // Check if email exists
            const emailExists: boolean = await this._userService.checkExistingEmail(this._email);

            // Check if email is empty or not valid
            if (this._email.trim() === "") {
                this._emailError = "Please fill in the email field";
                this._visibleErrorEmail = true;
            } else if (!this.validateEmail(this._email)) {
                this._emailError = "Please enter a valid email address";
                this._visibleErrorEmail = true;
            } else if (emailExists) {
                this._emailError = "Email doesn't exist in our system. Please register.";
                this._visibleErrorEmail = true;
            }

            // Check if password is empty or not correct
            if (this._password.trim() === "") {
                this._passwordError = "Please fill in the password field";
                this._visibleErrorPassword = true;
            } else {
                this._passwordError = "Invalid password";
                this._visibleErrorPassword = true;
            }
            
        }
    }


    /**
     * Validates an email address using a regular expression.
     * Returns true if valid, false otherwise.
     */
    private validateEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Renders the login page
     */
    public render(): TemplateResult {
        return html`
            <div class="form">

                <custom-input-element class="${"email"}" type="${"email"}" Id="${"email"}" @input=${this.input} .value=${this._email} placeholder="${"Email"}"></custom-input-element>

                ${this._visibleErrorEmail ? html`<div class="error">${this._emailError}</div>` : ""}

                <custom-input-element class="${"password"}" type="${"password"}" Id="${"password"}" @input=${this.input} .value=${this._password} placeholder="${"Password"}"></custom-input-element>

                ${this._visibleErrorPassword ? html`<div class="error">${this._passwordError}</div>` : ""}

                <div class="loginButton">
                    <button @click="${this.submitLoginForm}" type="button">Login</button>
                </div>
                Or
                <div class="registerButton">
                    <button @click="${(): void => this.navigateTo(RouterPage.Register)}">Create an account</button>
                </div>
            </div>
        `;

    }

    private navigateTo(page: RouterPage): void {
        this.dispatchEvent(new CustomEvent("navigate", { detail: page }));
    }

    /**
 * Deze functie wordt uitgevoerd wanneer er iets wordt ingevoerd in een Inputelement of TextAreaElement enzovoort.
 * Het haalt de waarde van de elementen op en stopt het in de variabele van de velden.
 * 
 * @param event Het object dat wordt gegenereerd wanneer er iets wordt ingevoerd in een Inputelement of TextAreaElement enzovoort.
 */
    private input(event: InputEvent): void {

        // Met dit haal je het element op
        const target: HTMLInputElement | HTMLTextAreaElement = event.target as HTMLInputElement | HTMLTextAreaElement;

        // Hiermee haal ik de ID van het element op
        const id: string = target.id;

        // Hiermee kan ik de ingevoerde waarde ophalen uit het element
        const value: string = target.value;

        // Met behulp van de switch kan ik bepalen welke waarde bij de juiste variabelen wordt gestopt 
        switch (id) {

            case "email":
                this._email = value;
                this._visibleErrorEmail = false;
                break;

            case "password":
                this._password = value;
                this._visibleErrorPassword = false;
                break;

        }

    }

}
