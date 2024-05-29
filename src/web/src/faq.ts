import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("faq-root")
export class AboutUs extends LitElement {
    public static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de "About Us"-pagina */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial ';
        }

        .web {
            background-color: white;
            overflow: hidden;
        }

        .heading h2 {
            color: rgb(18, 26, 132); /* Titelkleur gewijzigd naar rgb(18,26,132) */
            font-size: 55px;
            text-align: center;
            margin-top: 35px;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
            margin: 65px auto;
        }

        .web .content {
            flex: 1;
            width: 600px;
            margin: 0 25px;
        }

        .web .content h2 {
            font-size: 32px; /* Tekstgrootte verkleind naar 32px */
            margin-bottom: 20px;
            color: rgb(18, 26, 132); /* Tekstkleur gewijzigd naar rgb(18,26,132) */
            line-height: 1.2; /* Kleinere regelhoogte toegevoegd */
        }

        .web .content p {
            font-size: 20px; /* Tekstgrootte verkleind naar 20px */
            line-height: 1.5;
            margin-bottom: 20px;
            color: #333; /* Tekstkleur gewijzigd naar dezelfde kleur als in de Returns-component */
        }

        .web .content button {
            display: inline-block;
            background-color: rgb(18, 26, 132); /* Achtergrondkleur van de knop gewijzigd naar rgb(18,26,132) */
            color: #ecae20;
            padding: 0 24px;
            border-radius: 5px;
            font-size: 20px;
            border: none;
            cursor: pointer;
            transition: 0.3s ease;
        }

        .web .content button:hover {
            background-color: white;
            transform: scale(1.1);
        }

        .web-image {
            flex: 1;
            width: 600px;
            margin: auto;
            animation: fadeInRight 2s ease;
            margin-left: 50px; /* Afbeelding meer naar rechts verplaatst */
        }

        img {
            width: 45%; /* Breedte van de afbeelding verkleind naar 45% */
            height: auto;
            border-radius: 10px;
        }

        @media screen and (max-width: 768px) {
            .heading h2 {
                font-size: 45px;
                margin-top: 30px;
            }

            .container {
                width: 100%;
                flex-direction: column;
                margin: 0;
                padding: 0 40px;
            }

            .web .content {
                width: 100%;
                margin: 34px 0;
                animation: fadeInUp 2s ease;
            }

            .web .content h2 {
                font-size: 28px; /* Tekstgrootte verkleind naar 28px */
            }

            .web .content p {
                font-size: 18px; /* Tekstgrootte verkleind naar 18px */
                margin-bottom: 20px;
            }

            .web .content button {
                font-size: 16px;
                padding: 8px 16px;
            }


            .web-image {
                width: 100%;
                margin-left: 0; /* Reset de marge voor mobiele weergave */
            }
        }

        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(50px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInRight {
            0% {
                opacity: 0;
                transform: translateX(-50px);
            }

            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;

    // Voeg de toegankelijkheidsmodifier 'protected' toe aan de render methode
    protected render(): TemplateResult {
        return html`
            <div class="web">
                <div class="heading">
                    <h2>FAQ</h2>
                </div>
                
                <div class="container">
                    <div class="web content">
                        <h2>Our most frequently asked questions:</h2>
                        <h1>1. What payment methods do you accept?</h1>
                        <p>
                        We currently accept payments via credit card (Visa, Mastercard, American Express), PayPal, iDEAL and bank transfer.
                        </p>
                        
                        <h1>2. What are the shipping costs and how long does it take for my order to arrive?</h1>
                        <p>
                        Shipping costs vary depending on your location and the size of your order. Shipping costs will be clearly displayed during checkout. We aim to ship orders within a week after receiving payment. However, delivery times may vary depending on your location.
                        </p>
                        <h1>3. Can I cancel or modify my order after placing it?</h1>
                        <p>
                        Once an order has been placed and processed, it cannot be canceled or modified. However, please contact us as soon as possible if you need assistance canceling or modifying an order, and we will do our best to assist you. </p>

                        <h1>4. How can I contact your customer service?</h1> 
                        <p>For questions, comments, or assistance, you can contact us via info@lucastart.nl or by phone at +31 6 12345678. Our customer service team is ready to assist you!</p>   
                            <h4><p style="text-align: left; margin-top: 20px;">For more contact information, visit the homepage or our contact page.</p></h4>
                      
                        
                    <button onclick="window.location.href='index.html'">Back to Homepage</button>

                    </div>
                    <div class="web-image">
                        <img src="/public/assets/img/logo.png" alt="Logo Us Image">
                    </div>
                </div>
            </div>
        `;
    }
}






