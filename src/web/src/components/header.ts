/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { RouterPage } from "../components/Routerpage"; // Zorg ervoor dat je het juiste pad naar je router-page.ts hebt

@customElement("web-header")
export class WebHeader extends LitElement {

    public static styles = css`
        /* Voeg hier je CSS-stijlen toe */
    `;

    private _currentPage: RouterPage = RouterPage.Home;

    public render() {
        return html`
            <nav>
                <div
                    class="logo"
                    @click=${(): void => {
                        this._currentPage = RouterPage.Home;
                        this.dispatchEvent(new CustomEvent("navigate", { detail: this._currentPage }));
                    }}
                >
                    <img src="/assets/img/logo.png" alt="Logo" />
                </div>

                <div class="nav-items">
                    <a @click=${(): void => this.navigate(RouterPage.Login)}>Login</a>
                    <a @click=${(): void => this.navigate(RouterPage.Register)}>Register</a>
                    <a @click=${(): void => this.navigate(RouterPage.Cart)}>Cart</a>
                    <a @click=${(): void => this.navigate(RouterPage.Logout)}>Logout</a>
                </div>
            </nav>
        `;
    }
    public navigate(_Login: RouterPage): void {
        throw new Error("Method not implemented.");
    }
}
