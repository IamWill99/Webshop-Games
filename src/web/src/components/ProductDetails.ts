import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { OrderItemService } from "../services/OrderItemService";
import { Product } from "../components/product"; 

@customElement("product-details")
export class ProductDetails extends LitElement {

    @property({ type: Object }) product: Product | undefined;

    static styles: CSSResult = css`
        .product-details {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .product-details img {
            max-width: 100%;
            border-radius: 5px;
        }
        .product-details h1 {
            margin-bottom: 20px;
        }
    `;

    async connectedCallback(): Promise<void> {
        super.connectedCallback();
        const urlParams = new URLSearchParams(window.location.search);
        const productId = Number(urlParams.get('id'));
        console.log('Product ID:', productId); // Controleer of productId correct is
        if (productId) {
            const service = new OrderItemService();
            try {
                const product = await service.getProductById(productId);
                console.log('Fetched Product:', product); // Controleer of product correct wordt opgehaald
                this.product = product;
                this.requestUpdate();
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
                <img src="${this.product.thumbnail}" alt="${this.product.name}">
            </div>
        `;
    }
}
