import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("product-root")
export class product extends LitElement {
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

/* Footerstijlen */
footer {
    background-color: rgb(18, 26, 132);
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
    border-right: 1px solid white;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section ul li a {
    color: #ecae20;
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

    .footer-section {
        flex-basis: 50%;
    }
}

/* Media query voor telefoons */
@media only screen and (max-width: 600px) {
    .product {
        width: 100%;
    }

    .footer-content {
        flex-direction: column;
    }

    .footer-section {
        flex: none;
        border-right: none;
        margin-bottom: 20px;
    }
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
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Lost Memories: Quest of the Forgotten Knight </h3>
                <br>
                <p class="product-description">In a realm of magic and mystery, an unnamed protagonist sets out on a quest to find the lost damsel,
                    aided by strange artifacts and unexpected allies.
                    Through forests, caves, and cliffs, he uncovers fragments of his forgotten memories.</p>
            </div>

            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png" alt="The dragon-Slayer 3000">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> The dragon-Slayer 3000 </h3>
                <br>
                <p class="product-description">In this game you go with one of the three characters with your party to defeat the dragon.Can you handle the danger?</p>
            </div>

            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/f517798d34f14abcb65bee7386ef38dd/00000006000000000000000000000000.png" alt="Metro 8">
        <div class="buttons">
            <button class="more-info-button">More info</button>
           
            <div class="product-details">
                <h3> Metro 8 </h3>
                <br>
                <p class="product-description"> In this game you find yourself in an exciting world of underground tunnels and subway stations.
                    Armed with only your own wits and perseverance, you must navigate through a vast subway network.
                    The game is a maze, with hidden paths, puzzles and obstacles that you must overcome to progress.
                    As you explore deeper into the dark corridors, you will discover secrets and challenges that will test your skills.
                    Do you dare to find the way and escape from this underground labyrinth? </p>
            </div>
           
           
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>

              
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png" alt="Lost Memories: Quest of the Forgotten Knight">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Lost Memories: Quest of the Forgotten Knight </h3>
                <br>
                <p class="product-description">Are you able to save the future of mankind?\n\nIf you like science, logical thinking and wine you should give it a go...</p>
            </div>

            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In cart</button>
               
            </div>
        </div>
    </div>
  
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/3d97c66a0092447c93b1c04e63dd1988/00000006000000000000000000000000.png" alt="Murderous Mysteries">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Murderous Mysteries </h3>
                <br>
                <p class="product-description">On a foggy day in London you, Sherkey Jones, investigate the murder of Jessica Smith in her family mansion. Suspects include her mother, father and brother.
                    With your sharp mind you unravel clues hidden within the opulent home, determined to uncover the truth behind the tragedy.In this point-and-click detective game,
                    you assume the role of Sherkey Jones a detective, investigating the murder of Jessica Smith in her family mansion. Through exploration, interaction with objects, puzzle-solving and finding clues.
                    You wil unravel the truth behind the murder.
                    Multiple endings may result from your choices. So choose carefully....</p>
            </div>
           
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/9e25734d6c6a4b3d92308622e1522c76/00000006000000000000000000000000.png" alt="Masr">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Masr </h3>
                <br>
                <p class="product-description"> Masr - The dynasty of the future. </p>
            </div>
            
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
               
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/12306551034f4d2ebeed526ffd193121/00000006000000000000000000000000.png" alt="DOORWAY OF DECEPTION">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> DOORWAY OF DECEPTION </h3>
                <br>
                <p class="product-description"> Doorway of deception.Enter a world full of intrigue and hidden truths in Door of DeceptionHow to play
                    Explore every nook and cranny: Carefully examine your surroundings to find hidden clues that will help you solve the puzzles.
                    Use your mind: Combine clues and think logically to decipher the riddles you encounter. Unleash your creativity:
                    Sometimes the solution is not always obvious. Think outside the box and use your imagination to move forward.
                    Join the Journey Step into the shoes of an explorer and be surprised by the secrets that Door of Deception has to offer.
                    Prepare for an adventure full of challenges, intrigue and unexpected twists. Do you dare to find out the truth? </p>
            </div>

            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/84c86ce53485454382fb2287e387fa9e/00000006000000000000000000000000.png" alt="Bomb squad: classroom crisis">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Bomb squad: classroom crisis </h3>
                <br>
                <p class="product-description"> Bomb squad: classroom crisis</p>
            </div>
            
            <div> 
                <span class="base-price">€ 24,95</span>
                <button class="add-to-cart-button">In winkelwagen</button>
            </div>
        </div>
    </div>
    <div class="product">
        <img src="https://lucastars.hbo-ict.cloud/media/f8f2998c0bfc407cbfe46f367b3ab727/00000006000000000000000000000000.png" alt="Breakout">
        <div class="buttons">
            <button class="more-info-button">More info</button>

            <div class="product-details">
                <h3> Breakout </h3>
                <br>
                <p class="product-description">Try to breakout whilst super hungry.</p>
            </div>

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
    
    protected firstUpdated(): void {
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

