import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UserService } from "../services/UserService";
import { RouterPage } from "./Routerpage";
import "./CustomInputElement.ts";

/**
 * Custom element based on Lit for the header of the webshop.
 *
 * @todo Most of the logic in this component is over-simplified. You will have to replace most of if with actual implementions.
 */
@customElement("webshop-register")
export class Register extends LitElement {
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

    private _userService: UserService = new UserService();

    @state() private _username: string = "";
    @state() private _email: string = "";
    @state() private _password: string = "";
    @state() private _repeatPassword: string = "";
    @state() private _firstName: string = "";
    @state() private _lastName: string = "";

    @state() private _usernameError: string | null = null;
    @state() private _visibleErrorUsername: boolean = false;

    @state() private _emailError: string | null = null;
    @state() private _visibleErrorEmail: boolean = false;

    @state() private _passwordError: string | null = null;
    @state() private _visibleErrorPassword: boolean = false;

    @state() private _repeatPasswordError: string | null = null;
    @state() private _visibleErrorRepeatPassword: boolean = false;

    @state() private _firstNameError: string | null = null;
    @state() private _visibleErrorFirstName: boolean = false;

    @state() private _lastNameError: string | null = null;
    @state() private _visibleErrorLastName: boolean = false;

    /**
     * Handler for the register form
     */
    private async submitRegisterForm(): Promise<void> {

        // TODO: Validation

        const result: boolean = await this._userService.register({
            username: this._username,
            email: this._email,
            password: this._password,
            repeatPassword: this._repeatPassword,
            firstName: this._firstName,
            lastName: this._lastName,
            name: ""
        });

        if (result) {
            alert("Succesfully registered!");
            this.navigateTo(RouterPage.Login);
        } else {
        
        // Check if username is empty
        if (this._username.trim() === "") {
            this._usernameError = "Please fill in the username field";
            this._visibleErrorUsername = true;
        }

        // Check if email is empty or not valid
        if (this._email.trim() === "") {
            this._emailError = "Please fill in the email field";
            this._visibleErrorEmail = true;
        } else if (!this.validateEmail(this._email)) {
            this._emailError = "Please enter a valid email address";
            this._visibleErrorEmail = true;
        }

        // Check if password is empty
        if (this._password.trim() === "") {
            this._passwordError = "Please fill in the password field";
            this._visibleErrorPassword = true;
        }

        // Check if repeat password is empty
        if (this._repeatPassword.trim() === "") {
            this._repeatPasswordError = "Please fill in the repeat password field";
            this._visibleErrorRepeatPassword = true;
        } else if (this._repeatPassword !== this._password) {
            this._repeatPasswordError = "Passwords do not match";
            this._visibleErrorRepeatPassword = true;
        }

        // Check if first name is empty
        if (this._firstName.trim() === "") {
            this._firstNameError = "Please fill in the first name field";
            this._visibleErrorFirstName = true;
        }

        // Check if last name is empty
        if (this._lastName.trim() === "") {
            this._lastNameError = "Please fill in the last name field";
            this._visibleErrorLastName = true;
        }

        // Check if email exists
        const emailExists: boolean = await this._userService.checkExistingEmail(this._email);
        if (!emailExists) {
            this._emailError = "Email already exists";
            this._visibleErrorEmail = true;
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
     * Renders the register page
     */
    public render(): TemplateResult {
        return html`
            <div class="form">

                <custom-input-element class="${"username"}" type="${"text"}" Id="${"username"}" @input=${this.input} .value=${this._username} placeholder="${"Username"}"></custom-input-element>

                ${this._visibleErrorUsername ? html`<div class="error">${this._usernameError}</div>` : ""}

                <custom-input-element type="${"email"}" Id="${"email"}" @input=${this.input} .value=${this._email} placeholder="${"Email"}"></custom-input-element>

                ${this._visibleErrorEmail ? html`<div class="error">${this._emailError}</div>` : ""}

                <custom-input-element type="${"password"}" Id="${"password"}" @input=${this.input} .value=${this._password} placeholder="${"Password"}"></custom-input-element>

                ${this._visibleErrorPassword ? html`<div class="error">${this._passwordError}</div>` : ""}

                <custom-input-element type="${"password"}" Id="${"repeatPassword"}" @input=${this.input} .value=${this._repeatPassword} placeholder="${"Repeat password"}"></custom-input-element>

                ${this._visibleErrorRepeatPassword ? html`<div class="error">${this._repeatPasswordError}</div>` : ""}

                <custom-input-element type="${"text"}" Id="${"firstName"}" @input=${this.input} .value=${this._firstName} placeholder="${"First name"}"></custom-input-element>

                ${this._visibleErrorFirstName ? html`<div class="error">${this._firstNameError}</div>` : ""}

                <custom-input-element type="${"text"}" Id="${"lastName"}" @input=${this.input} .value=${this._lastName} placeholder="${"Last name"}"></custom-input-element>

                ${this._visibleErrorLastName ? html`<div class="error">${this._lastNameError}</div>` : ""}

                <div class="button">
                    <button @click="${this.submitRegisterForm}" type="submit">Create an aacount</button>
                </div>

                <div class="hrefText">
                    Already have an account?
                    <a href="#" @click="${(): void => this.navigateTo(RouterPage.Login)}">Login here.</a>
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

            case "username":
                this._username = value;
                this._visibleErrorUsername = false;
                break;

            case "email":
                this._email = value;
                this._visibleErrorEmail = false;
                break;

            case "password":
                this._password = value;
                this._visibleErrorPassword = false;
                break;

            case "repeatPassword":
                this._repeatPassword = value;
                this._visibleErrorRepeatPassword = false;
                break;

            case "firstName":
                this._firstName = value;
                this._visibleErrorFirstName = false;
                break;

            case "lastName":
                this._lastName = value;
                this._visibleErrorLastName = false;
                break;
        }

    }

}
