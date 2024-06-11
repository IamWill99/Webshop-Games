// checkOut.ts

// Definieer het Product-interface hier
interface Product {
    id: number;
    images: unknown;
    thumbnail: unknown;
    name: string;
    imageUrl: string;
    description: string;
    price: string;
}

document.addEventListener("DOMContentLoaded", () => {
    // Haal de opgeslagen winkelwageninhoud op uit de sessie
    const storedCart: string | null = sessionStorage.getItem("cart");
    const cartItems: [Product, number][] = storedCart ? JSON.parse(storedCart) : [];

    // Selecteer de elementen op de checkout-pagina waar de producten worden weergegeven
    const checkoutList: HTMLUListElement | null = document.querySelector("#checkout-list");
    const totalPriceElement: HTMLElement | null = document.querySelector("#total-price");

    if (checkoutList && totalPriceElement) {
        // Maak een lege lijst om de producten weer te geven
        let totalPrice: number = 0;

        // Loop door elk product in de winkelwagen en voeg deze toe aan de lijst op de checkout-pagina
        cartItems.forEach(([product, quantity]) => {
            const listItem: HTMLLIElement = document.createElement("li");
            listItem.textContent = `${product.name} - €${product.price} x ${quantity}`;
            checkoutList.appendChild(listItem);

            // Bereken de totaalprijs van alle producten in het winkelwagentje
            totalPrice += parseFloat(product.price) * quantity;
        });

        // Toon de totaalprijs op de checkout-pagina
        totalPriceElement.textContent = `Total: €${totalPrice.toFixed(2)}`;
    }
});
