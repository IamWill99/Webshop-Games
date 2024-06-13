import { LitElement, html, css, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("profile-root")
export class ProfileRoot extends LitElement {

    protected render(): TemplateResult {
        return html`
            <div class="profile-section">
                <h2>Liked Product Titles</h2>

            </div>
        `;
    }


    public static styles = css`
        .profile-section {
            padding: 20px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-top: 20px;
        }
    `;
}
