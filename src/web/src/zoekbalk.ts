const userCardTemplate: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>("[data-user-template]");
const userCardContainer: HTMLElement | null = document.querySelector<HTMLElement>("[data-user-cards-container]");
const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#data-search");

interface User {
    name: string;
    email: string;
    element: DocumentFragment;
}

let users: User[] = [];
console.log(searchInput);
console.log(userCardTemplate);
console.log(userCardContainer);

if (searchInput && userCardTemplate && userCardContainer) {
    console.log("hallo1");
    searchInput.addEventListener("input", (e) => {
        const value: string = (e.target as HTMLInputElement).value.toLowerCase();
        users.forEach(user => {
            const isVisible: boolean =
                user.name.includes(value) ||
                user.email.toLowerCase().includes(value);
            (user.element.firstChild as HTMLElement).classList.toggle("hide", !isVisible);
        });
    });

    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then((data: any[]) => {
            users = data.map((user: any) => {
                const card: DocumentFragment = userCardTemplate.content.cloneNode(true) as DocumentFragment;
                const header: Element | null = card.querySelector("[data-header]") || document.createElement("div");
                const body: Element | null = card.querySelector("[data-body]") || document.createElement("div");
                if (header instanceof HTMLElement && body instanceof HTMLElement) {
                    header.textContent = user.name;
                    body.textContent = user.email;
                    userCardContainer.appendChild(card);
                    return { name: user.name, email: user.email, element: card };
                }
                console.log(user);
                return null;
            }).filter((user: User | null): user is User => !!user);
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
} else {
    console.error("Search input, user card template, or container not found");
}






