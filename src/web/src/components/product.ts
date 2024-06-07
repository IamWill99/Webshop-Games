import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import {OrderItemService} from "../services/OrderItemService";

// De Product interface definieert de structuur van een product object.
// Elk product heeft een naam, een URL van een afbeelding, een beschrijving, en een prijs.
// Dit wordt gebruikt om type-veiligheid te garanderen bij het werken met producten in de applicatie.

interface Product {
    id: number;
    images: unknown;
    thumbnail: unknown;
    name: string;
    imageUrl: string;
    description: string;
    price: string;
}



@customElement("product-root")
export class product extends LitElement {

    private currentPage: number = 1;
    private productsPerPage: number = 9; // Bijvoorbeeld, 9 producten per pagina

    public _userService: any;
    public _cartItemsCount: number | undefined;



  // Definieer en initialiseer de array met producten
  @property() public products: any =[];

private cart: Map<Product, number> = new Map(); // Hier houden we het winkelwagentje bij
    public handleSortChange: unknown;

public connectedCallback(): void {
    super.connectedCallback();
    this.fetchProducts();
}

  public fetchProducts(): void {
    const service:OrderItemService = new OrderItemService();

    const result: any = service.getAll().then((value: any) => {
        console.log(value);

        this.products = value;
    }).catch((error) => {
        console.log(error);
    });
   
    console.log(result);
}


    public static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de "Product Page"-pagina */

       /* Standaard stijlen */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial';
}

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
}

.wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Navigatiestijlen */
.navbar {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.navbar-logo img {
    height: 50px;
}

.navbar-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar-links li {
    margin-right: 20px;
}

.navbar-links a {
    text-decoration: none;
    color: rgb(18, 26, 132);
    transition: color 0.3s ease;
}

.navbar-links a:hover {
    color: #ecae20;
}

.nav-search {
    margin-left: auto;
}

.search-bar {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
}

.search-bar:focus {
    outline: none;
    border-color: #ecae20;
}

/* Productsectiestijlen */
.product-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}

.product {
    width: 30%;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
}

.product img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
}

.more-info-button,
.add-to-cart-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

.more-info-button {
    background-color: rgb(18, 26, 132);
    color: #fff;
}

.add-to-cart-button {
    background-color: red;
    color: #fff;
    margin-top: 10px;
}

.add-to-cart-button:hover {
    background-color: #555;
}

.social-icons img {
    width: 40px;
    height: auto;
    margin-right: 10px;
}

.product-filter {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
    display: flex;
}

.filter-option {
    margin-right: 10px;
}

.filter-option a {
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    color: rgb(18, 26, 132);
}

.filter-option a.selected {
    background-color: rgb(18, 26, 132);
    color: #fff;
}

.filter-option a:hover {
    background-color: #f0f0f0;
}

.product-description {
    display: none;
}

/* Media query voor tablets */
@media only screen and (max-width: 1024px) {
    .product {
        width: 45%;
    }

  
}

/* Media query voor telefoons */
@media only screen and (max-width: 600px) {
    .product {
        width: 100%;
    }

  
}


a {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

a:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: red;
  color: white
}

.next {
  background-color: red;
  color: white;
}

.round {
  border-radius: 50%;
}

.cart-section {
    padding:24px;
    background-color: rgb(18, 26, 132);
    border-radius:20px;
    color:white;

}

#orderButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    background-color:red;
    color:white;
}

#orderButton:hover {
    background-color: #555;
}

#emptyCartButton {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    background-color:red;
    color:white;
}

#emptyCartButton:hover {
    background-color: #555;
}

#removeFromCart {
    padding: 4px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    background-color:red;
    color:white;
}

#removeFromCart:hover {
    background-color: #555;
}

.small-images{
    width: 100px;
    height: 120px
}
    `;

    private addNextPageProducts(): void {
        const startIndex: number = this.currentPage * this.productsPerPage;
        const endIndex: number = startIndex + this.productsPerPage;
        const nextProducts: Product[] = this.products.slice(startIndex, endIndex);
        this.products = [...this.products, ...nextProducts];
    }

    

    private addToCart(product: Product): void {
        const currentQuantity:any = this.cart.get(product) || 0;
        this.cart.set(product, currentQuantity + 1); // Voeg één exemplaar van het product toe
    
        // Sla de inhoud van het winkelwagentje op in de sessie
        sessionStorage.setItem("cart", JSON.stringify(Array.from(this.cart.entries())));
    
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }


    protected render(): TemplateResult {
        const startIndex: number = (this.currentPage - 1) * this.productsPerPage;
        const endIndex: number = startIndex + this.productsPerPage;
        const productsToShow: Product[] = this.products.slice(startIndex, endIndex);
        const totalPrice: any = Array.from(this.cart.entries()).reduce((total, [product, quantity]) => {
            return total + (parseFloat(product.price) * quantity);
        }, 0);
        const cartItems: any = Array.from(this.cart.entries()).map(([product, quantity]) => html`
        <li>${product.name} - € ${product.price} x ${quantity}
        <button id="removeFromCart" @click=${(): any => this.removeFromCart(product)}> Remove </button>
    </li>
    `);
        // Navbar & Filters HTML
    
        return html`
            <div class="wrapper">

            
            <div class="page-content">
            <section class="filters">

            <p>Sort by: </p>

            <br>
            <select name="games-sort" id="gamesSort" @change=${this.handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            </select>

            <br>
            <br>
        </section>
            
    
                <section class="cart-section">
                <h2>Shoppingcart</h2>
                <br>
                <ul>
                    ${cartItems}
                </ul>
                <br>
                <p><strong>Total: € ${totalPrice.toFixed(2)}</strong></p>
                <br>
                <button id="orderButton" @click=${this.goToCheckout}>Checkout</button>
                <button id="emptyCartButton" @click=${this.emptyCart}>Empty cart</button>
            </section>
        <section class="product-section">
                    ${productsToShow.map(product => html`
                        <div class="product">
                            <img src="${product.thumbnail}" alt="${product.name}" class="small-images">
                            <div class="buttons">
                                <button class="more-info-button" @click=${(): void => this.goToProductDetails(product.id)}>More info</button>
                                <div class="product-details">
                                    <h3>${product.name}</h3>
                                    <br>
                                    <p class="product-description">${product.description}</p>
                                </div>
                                <div> 
                                    <span class="base-price">€ ${product.price}</span>
                                    <button class="add-to-cart-button" @click=${(): void => this.addToCart(product)}>In cart</button>
                                </div>
                            </div>
                        </div>
                    `)}
                </section>
    
    
    
                 <!-- Paginatieknoppen -->
                 <div class="pagination">
                    <a href="#" class="previous" @click=${this.navigateToPrevious}>&laquo; Previous</a>
                    <a href="#" class="next" @click=${this.navigateToNext}>Next &raquo;</a>
                </div>
            </div>
            </div>
        `;
    }
    
    private goToProductDetails(productId: number): void {
        window.location.href = `/product-details?id=${productId}`;
    }
    

    // Deze methode navigeert naar de vorige pagina met producten.
    // Het controleert eerst of de huidige pagina groter is dan 1.
    // Als dit het geval is, wordt de huidige pagina met 1 verminderd
    // en wordt de weergave opnieuw opgebouwd om de nieuwe pagina te tonen.

    private navigateToPrevious(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.requestUpdate(); // Herbouw de weergave om de nieuwe pagina te tonen
        }
    }

    

    // Deze methode navigeert naar de volgende pagina met producten.
    // Het berekent eerst het totale aantal pagina's op basis van het aantal producten en producten per pagina.
    // Als de huidige pagina kleiner is dan het totale aantal pagina's,
    // wordt de huidige pagina met 1 verhoogd en worden de producten voor de nieuwe pagina toegevoegd.
    // Vervolgens wordt de weergave opnieuw opgebouwd om de nieuwe pagina te tonen.


    private navigateToNext(): void {
        const totalPages: number = 5; 
        Math.ceil(this.products.length / this.productsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;

             // Voeg nieuwe producten toe voordat je de weergave bijwerkt
             this.addNextPageProducts();

            this.requestUpdate(); // Herbouw de weergave om de nieuwe pagina te tonen
        }  else {
            // De huidige pagina is de laatste pagina, dus doe niets
            console.log("Dit is de laatste pagina. Kan niet verder gaan.");
        }

    }

    private emptyCart(): void {
        this.cart.clear(); // Maak het winkelwagentje leeg

        // Verwijder het winkelwagentje uit de sessie
        sessionStorage.removeItem("cart");
    
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }
    
    private removeFromCart(product: Product): void {
        const currentQuantity: any = this.cart.get(product) || 0;
        if (currentQuantity > 1) {
            this.cart.set(product, currentQuantity - 1); // Verwijder één exemplaar van het product
        } else {
            this.cart.delete(product); // Verwijder het product volledig als er nog maar één exemplaar van is
        }
        sessionStorage.setItem("cart", JSON.stringify(Array.from(this.cart.entries())));
        
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }

    private goToCheckout(): void {

        window.location.href = "checkOut"; // Navigeer naar de bestelpagina
    }

    protected firstUpdated(): void {
        const storedCart:any = sessionStorage.getItem("cart");
    if (storedCart) {
        this.cart = new Map(JSON.parse(storedCart));
        this.requestUpdate(); // Herbouw de weergave om de winkelwagen bij te werken
    }
        // eslint-disable-next-line @typescript-eslint/typedef
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            const moreInfoButtons: NodeListOf<HTMLButtonElement> | null = shadowRoot.querySelectorAll(".more-info-button");
    
            if (moreInfoButtons) {
                moreInfoButtons.forEach((button: HTMLButtonElement) => {
                    button.addEventListener("click", () => {
                        // eslint-disable-next-line @typescript-eslint/typedef
                        const productDetails = button.nextElementSibling;
                        if (productDetails) {
                            // eslint-disable-next-line @typescript-eslint/typedef
                            const productDescription = productDetails.querySelector(".product-description");
                            if (productDescription) {
                                // eslint-disable-next-line @typescript-eslint/typedef
                                const descriptionElement = productDescription as HTMLElement;
                                if (descriptionElement.style.display === "none" || !descriptionElement.style.display) {
                                    descriptionElement.style.display ="block";
                                } else {
                                    descriptionElement.style.display = "none";
                                }
                            }
                        }
                    });
                });
            }
        }
        
    }
 
    
}
