import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("returns-root")
export class Returns extends LitElement {
    public static styles: CSSResult = css`
        /* Voeg je CSS-stijlen toe voor de "Returns" pagina */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial'; /* Gebruik 'sans-serif' als generiek lettertypefamilie */
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
                    <h2>Returns Information</h2>
                </div>
                <div class="container">
                    <div class="web content">
                        <div class="returns-container">
                            <h3>Returns Information</h3>
                            <p>
                                We want you to be completely satisfied with your purchase. If for any reason you are not entirely pleased, you may return your purchase within 30 days for a full refund or exchange.
                            </p>

                            <br>
                            <h4>Return Process:</h4>
                            <p>
                            To begin a return, please reach out to our customer support team via email or phone. Our representatives will assist you through the return process and provide you with a return authorization number.
                            </p>
                            <br>

                            <h4>Return Shipping:</h4>
                            <p>
                                The cost of return shipping is the responsibility of the customer, unless the return is due to a fault or error on our part. We recommend using a trackable shipping method to ensure the safe return of your item.
                            </p>

                            <br>
                            <h4>Refund Processing:</h4>
                            <p>
                                Once we receive your returned item, we will inspect it and notify you regarding the status of your refund or exchange. Refunds will be processed within 5-7 business days to the original method of payment.
                            </p>

                            <br>
                            <h4>Contact Us:</h4>
                            <p>
                                If you have any questions or concerns regarding returns or your order, our customer support team is available to assist you. Reach out to us via email or phone, and we'll be happy to help.
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
