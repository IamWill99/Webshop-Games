// NOTE: This makes sure the component can be rendered by the browser
export * from "./components/Root";
import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("index-root")
export class Menubalk extends LitElement {
    public static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de "About Us"-pagina */
        * 
        
        
        .navigationmenu {
    height: 100%;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color:rgb(18,26,132);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    z-index: 1;
}

.navigationmenu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.navigationmenu li {
    padding: 15px;
    text-align: center;
}

.navigationmenu a {
    text-decoration:solid;
    font-family: Verdana, sans-serif;
    color: white;
    font-size: 20px;
    padding: 10px 30px;
    width: 50%;
    top: 30px;
    position: relative;
}

.navigationmenu a:hover {
    background-color:rgb(9, 13, 66);
    transition: 0.5s;
    padding: 10px 40px;
    border-radius: 20px;
}


.containermenu {
    display: inline-block;
    cursor: pointer;
    z-index: 50;
    position: fixed;
    top: 20px;
    left: 5px;
    background-color: rgb(18,26,132);
    border-radius: 40px;
    padding: 7px;
  }
  
  .bar1, .bar2, .bar3 {
    width: 30px;
    height: 4px;
    margin: 6px 0;
    transition: 0.4s;
    z-index: 5;
    background-color:rgb(255, 255, 255);
    
  }
  
  /* Rotate first bar */
  .change .bar1 {
    transform: translate(0, 9px) rotate(-45deg);
    z-index: 5;
  }
  
  /* Fade out the second bar */
  .change .bar2 {opacity: 0;}
  
  /* Rotate last bar */
  .change .bar3 {
    transform: translate(0, -11px) rotate(45deg);
    z-index: 5;
  }
    `;


protected render(): TemplateResult {
    return html`
    <script>
            function myFunction(x) {
              x.classList.toggle("change");
            }
            </script>
        <div class="navigationmenu">
            <ul>
                <div class="containermenu" onclick="myFunction(this)">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                  </div>
                <li><a href="index.html">Home</a></li>
                <li><a href="AboutUs.html ">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="product.html">Product</a></li>
            </ul>
        </div>

        
    `;
}




}

function toggleNav():void {
    const navbar: HTMLDivElement = document.querySelector(".navigationmenu") as HTMLDivElement;
    navbar.style.width = navbar.style.width === "200px" ? "0" : "200px" ;
}
// Dit zorg ervoor dat alle knoppen met het id toggle-button worden opgeroepen om de functie uit te voeren
document.querySelectorAll<HTMLButtonElement>(".containermenu")
    .forEach((button: HTMLButtonElement) => button.addEventListener("click", toggleNav));


            
      