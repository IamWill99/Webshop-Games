document.addEventListener("DOMContentLoaded", (): void => {
    const likedProductsList: HTMLElement | null = document.getElementById("liked-products-list");

    if (likedProductsList) {
        const storedLikedProductTitles: string | null = localStorage.getItem("likedProductTitles");
        if (storedLikedProductTitles) {
            const likedProductTitles: string[] = JSON.parse(storedLikedProductTitles) as string[];
            likedProductTitles.forEach((title: string): void => {
                const listItem: HTMLLIElement = document.createElement("li");
                listItem.textContent = title;
                likedProductsList.appendChild(listItem);
            });
        } else {
            likedProductsList.textContent = "No liked products.";
        }
    }
});
