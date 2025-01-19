const searchBars = document.querySelectorAll(".form-control.me-2");
const cards = document.querySelectorAll(".card");

export function searchCards() {
    searchBars.forEach((searchBar) => {
        searchBar.addEventListener("input", () => {
            let searchValue = searchBar.value.toLowerCase();
            cards.forEach((card) => {
                const title = card.querySelector(".card-title").textContent.toLowerCase();
                const description = card.querySelector(".card-description").textContent.toLowerCase();

                if (title.includes(searchValue) || description.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}
