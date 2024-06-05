import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("shipping-root")
export class Shipping extends LitElement {
    public static styles: CSSResult = css`
        /* Voeg je CSS-stijlen toe voor de "Shipping" pagina */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial';
        }

        .web {
            background-color: white;
            overflow: hidden;
        }

        .heading h2 {
            color: rgb(18, 26, 132);
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

        label {
            font-size: 20px;
            margin-bottom: 10px;
            display: block;
        }

        input, select {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }

        button {
            background-color: rgb(18, 26, 132);
            color: #ecae20;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            font-size: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: white;
        }

        @media screen and (max-width: 768px) {
            .heading h2 {
                font-size: 45px;
                margin-top: 30px;
            }

            .container {
                flex-direction: column;
            }

            .web .content {
                width: 100%;
                margin: 20px 0;
            }
        }
    `;

protected render(): TemplateResult {
    return html`
        <div class="web">
            <div class="heading">
                <h2>Shipping Information</h2>
            </div>
            <div class="container">
                <div class="web content">
                    <div class="shipping-container">
                        <h3>Shipping Information</h3>
                        <p>
                            Thank you for choosing our webshop! We're thrilled to offer you an extensive selection of games and merchandise to fuel your gaming passion. Before you proceed with your purchase, here's some important shipping information to ensure a smooth shopping experience:
                        </p>

                        <br>
                        <h4>Shipping Address:</h4>
                        <p>
                            Please provide your complete and accurate shipping address during checkout to avoid any delays in delivery. Double-check your address details to ensure your order reaches you promptly.
                        </p>
                        <br>

                        <h4>Delivery Time:</h4>
                        <p>
                            We strive to process and ship orders as quickly as possible. Typically, orders are processed within 3-5 business days. Delivery times may vary depending on your location and shipping method selected during checkout.
                        </p>

                        <br>
                        <h4>Shipping Options:</h4>
                        <p>
                        We provide different shipping choices to fit your needs and timeframe. You can select standard shipping for affordable delivery or express shipping for quicker delivery.
                        </p>

                        <br>
                        <h4>International Shipping:</h4>
                        <p>
                        We're happy to ship worldwide to serve gamers everywhere. Just keep in mind that international shipping might have extra costs like customs fees, and it's the recipient's responsibility to cover them.
                        </p>

                        <br>
                        <h4>Track Your Order:</h4>
                        <p>
                            Once your order is dispatched, you'll receive a tracking number via email to monitor the status of your shipment. You can track your order directly on our website or through the shipping carrier's website.
                        </p>

                        <br>
                        <h4>Contact Us:</h4>
                        <p>
                            If you have any questions or concerns regarding shipping or your order, our customer support team is here to assist you. Feel free to reach out to us via email or phone, and we'll be happy to help.
                        </p>


                       <h4><p style="text-align: center; margin-top: 20px;">For contact information, visit the homepage.</p></h4>


                        <br>
                        <button onclick="window.location.href='index.html'">Back to Homepage</button>
                    </div>
                </div>
            </div>
           
        </div>
       
    `;
}


}
