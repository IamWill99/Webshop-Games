import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";

@customElement("product-details")
export class ProductDetails extends LitElement {
    
    @property({ type: Object }) product: Product | undefined;

    static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de productdetailpagina */
    `;

    async connectedCallback(): Promise<void> {
        super.connectedCallback();
        const urlParams = new URLSearchParams(window.location.search);
        const productId = Number(urlParams.get('id'));
        if (productId) {
            const service = new OrderItemService();
            try {
                const product = await service.getProductByID(productId);
                this.product = product;
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
    }

    protected render(): TemplateResult {
        if (!this.product) {
            return html`<p>Loading...</p>`;
        }
        return html`
            <div class="product-details">
                <h1>${this.product.name}</h1>
                <img src="${this.product.imageUrl}" alt="${this.product.name}">
                <p>${this.product.description}</p>
                <p>Price: € ${this.product.price}</p>
                <!-- Voeg hier meer productdetails toe -->
            </div>
        `;
    }
}
