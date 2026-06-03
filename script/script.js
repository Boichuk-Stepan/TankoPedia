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

//FILTER

// --- 1. Функція для оновлення стану та збереження в localStorage ---
function runFilter() {
    const activeCountries = Array.from(document.querySelectorAll('.country:checked')).map(box => box.value);
    const activeTypes = Array.from(document.querySelectorAll('.type:checked')).map(box => box.value);

    // Зберігаємо стан в localStorage
    localStorage.setItem('filterCountries', JSON.stringify(activeCountries));
    localStorage.setItem('filterTypes', JSON.stringify(activeTypes));

    const cards = document.querySelectorAll('.cont');
    cards.forEach(card => {
        const matchCountry = activeCountries.length === 0 || activeCountries.some(c => card.classList.contains(c));
        const matchType = activeTypes.length === 0 || activeTypes.some(t => card.classList.contains(t));

        card.style.display = (matchCountry && matchType) ? 'block' : 'none';
    });
}

// --- 2. Функція відновлення при завантаженні ---
function restoreFilters() {
    const savedCountries = JSON.parse(localStorage.getItem('filterCountries') || '[]');
    const savedTypes = JSON.parse(localStorage.getItem('filterTypes') || '[]');

    // Відмічаємо галочки
    savedCountries.forEach(val => {
        const box = document.querySelector(`.country[value="${val}"]`);
        if (box) box.checked = true;
    });
    savedTypes.forEach(val => {
        const box = document.querySelector(`.type[value="${val}"]`);
        if (box) box.checked = true;
    });

    // Запускаємо фільтрацію, щоб застосувати видимість
    if (savedCountries.length > 0 || savedTypes.length > 0) {
        runFilter();
    }
}

// --- 3. Ініціалізація ---
document.querySelectorAll('.country, .type').forEach(box => {
    box.addEventListener('change', runFilter);
});

// Запускаємо відновлення при старті
document.addEventListener('DOMContentLoaded', restoreFilters);

//RESET

function resetFilters() {
    // 1. Очищаємо пам'ять
    localStorage.clear(); 
    
    // 2. Скидаємо всі чекбокси
    document.querySelectorAll('input:checked').forEach(box => box.checked = false);
    
    // 3. Скидаємо поле пошуку
    const searchInput = document.getElementById('tankSearch');
    if (searchInput) {
        searchInput.value = ''; 
    }
    
    // 4. Оновлюємо вигляд (перезапускаємо фільтрацію)
    runFilter(); 
}