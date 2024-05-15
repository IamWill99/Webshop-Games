import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("product-root")
export class product extends LitElement {
    public static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de "Product Page"-pagina */

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
            flex-direction: column; /* Zet de richting van de knoppen naar kolom */
            margin-top: 10px; /* Voeg wat ruimte toe boven de knoppen */
        }

        .more-info-button,
        .add-to-cart-button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 10px; /* Voeg marge toe tussen de knoppen */
        }

        .more-info-button {
            background-color: rgb(18, 26, 132);
            color: #fff;
        }

        .add-to-cart-button {
            background-color: red;
            color: #fff;
            margin-top: 10px; /* Voeg wat extra ruimte toe boven de "In cart" knop */
        }

        .add-to-cart-button:hover {
            background-color: #555;
        }

        /* Footerstijlen */
        footer {
            background-color: rgb(18, 26, 132); /* Dezelfde blauwe kleur als op je homepagina */
            color: #fff;
            padding: 20px;
            text-align: center;
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
            height: auto;
            margin-right: 10px; /* Voeg wat ruimte toe tussen de afbeeldingen */
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
            color: rgb(18, 26, 132); /* Blauw */
        }

        .filter-option a.selected {
            background-color: rgb(18, 26, 132);
            color: #fff;
        }

        .filter-option a:hover {
            background-color: #f0f0f0;
        }
    `;


    protected render(): TemplateResult {
        return html`
            <div class="wrapper">
            <button onclick="window.location.href='index.html'">Back to Homepage</button>
                <nav class="navbar">
                    <div class="navbar-logo">
                        <a href="#">
                            <img src="/assets/img/logo.png" alt="Logo" class="logo">
                        </a>
                    </div>
                    <ul class="navbar-links">
                        <li><a href="#" class="selected">Games</a></li>
                        <li><a href="#">Merchandise</a></li>
                        <li><a href="#">News</a></li>
                    </ul>
                    <form class="nav-search">
                        <input type="text" placeholder="Search" class="search-bar">
                    </form>
                </nav>

                <ul class="product-filter">
                    <li><span class="filter-title">Filter: </span></li>
                    <li class="filter-option"><a href="#">Genre</a></li>
                    <li class="filter-option"><a href="#" class="selected">Rating</a></li>
                    <li class="filter-option"><a href="#">Name</a></li>
                    <li class="filter-option"><a href="#">Price</a></li>
                    <li class="filter-option"><a href="#">Offers</a></li>
                </ul>

                <section class="product-section">
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/7da176806505408c88b0d5f16f000a7b/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png" alt="The dragon-Slayer 3000">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/f517798d34f14abcb65bee7386ef38dd/00000006000000000000000000000000.png" alt="Metro 8">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
  
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/3d97c66a0092447c93b1c04e63dd1988/00000006000000000000000000000000.png" alt="Murderous Mysteries">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/9e25734d6c6a4b3d92308622e1522c76/00000006000000000000000000000000.png" alt="Masr">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/12306551034f4d2ebeed526ffd193121/00000006000000000000000000000000.png" alt="DOORWAY OF DECEPTION">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/84c86ce53485454382fb2287e387fa9e/00000006000000000000000000000000.png" alt="Bomb squad: classroom crisis">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/f8f2998c0bfc407cbfe46f367b3ab727/00000006000000000000000000000000.png" alt="Breakout">
        <div class="buttons">
            <button class="more-info-button">Meer info</button>
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
</section>

            </div>

            <footer>
                <div class="footer-content">

                    <!-- Footer content gaat hier -->
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
                                <a href="#"><img src="/assets/img/fb.png" alt="Facebook" /></a>
                            </li>
                            <li>
                                <a href="#"><img src="/assets/img/insta.png" alt="Instagram" /></a>
                            </li>
                            <li>
                                <a href="#"><img src="/assets/img/x.png" alt="Twitter" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        `;
    }
}