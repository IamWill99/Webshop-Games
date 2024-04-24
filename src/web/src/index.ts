// NOTE: This makes sure the component can be rendered by the browser
export * from "./components/Root";

function toggleNav():void {
    const navbar: HTMLDivElement = document.querySelector(".navigationmenu") as HTMLDivElement;
    navbar.style.width = navbar.style.width === "200px" ? "0" : "200px" ;
}
// Dit zorg ervoor dat alle knoppen met het id toggle-button worden opgeroepen om de functie uit te voeren
document.querySelectorAll<HTMLButtonElement>(".containermenu")
    .forEach((button: HTMLButtonElement) => button.addEventListener("click", toggleNav));


            
      