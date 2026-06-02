function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// SEARCH

// Чекаємо, поки користувач почне писати в полі пошуку
document.getElementById('tankSearch').addEventListener('input', function () {
    let filter = this.value.toLowerCase(); // Те, що ввів користувач (у малому регістрі)
    let cards = document.querySelectorAll('.cont'); // Знаходимо всі твої картки

    cards.forEach(card => {
        // Знаходимо параграф з назвою всередині картки
        let p = card.querySelector('p');

        if (p) {
            let tankName = p.textContent.toLowerCase(); // Назва танка з HTML

            // Якщо назва містить введені букви — показуємо, якщо ні — приховуємо
            if (tankName.includes(filter)) {
                card.style.display = "block"; // Повертаємо стандартний вигляд (grid-item)
            } else {
                card.style.display = "none"; // Ховаємо
            }
        }
    });
})

// FILTER

// Додаємо кожній галочці "слухача"
document.querySelectorAll('.country').forEach(box => {
    box.addEventListener('change', runFilter);
});
document.querySelectorAll('.type').forEach(box => {
    box.addEventListener('change', runFilter);
});
function runFilter() {
    // 1. Збираємо вибрані країни
    const activeCountries = Array.from(document.querySelectorAll('.country:checked'))
        .map(box => box.value);

    // 2. Збираємо вибрані типи
    const activeTypes = Array.from(document.querySelectorAll('.type:checked'))
        .map(box => box.value);

    const cards = document.querySelectorAll('.cont');

    cards.forEach(card => {
        // Перевіряємо країну: чи підходить картка під вибрані країни?
        // Якщо країни не вибрані, то вважаємо, що підходять усі (true)
        const matchCountry = activeCountries.length === 0 ||
            activeCountries.some(c => card.classList.contains(c));

        // Перевіряємо тип: чи підходить картка під вибрані типи?
        const matchType = activeTypes.length === 0 ||
            activeTypes.some(t => card.classList.contains(t));

        // Танк видимий тільки якщо ВІН ПІДХОДИТЬ І ЗА КРАЇНОЮ, І ЗА ТИПОМ
        if (matchCountry && matchType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}