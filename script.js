const API_KEY = 'AIzaSyDhRkGVHHVQFZawq88oqCZdbtx31E34oFc';
const SEARCH_ENGINE_ID = '7711ea5701a374fd1';

const form = document.getElementById('search-form');
const queryInput = document.getElementById('query-input');
const imagesContainer = document.getElementById('images-container');

async function searchImages(query) {
    try {
        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}&searchType=image&num=10`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Ошибка при получении данных от Google');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Ошибка при поиске: ${error.message}`);
    }
}

function displayImages(data) {
    imagesContainer.innerHTML = '';

    if (!data.items || data.items.length === 0) {
        imagesContainer.innerHTML = `<p>По вашему запросу ничего не найдено.</p>`;
        return;
    }

    data.items.forEach(item => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image-item');

        const img = document.createElement('img');
        img.src = item.link;
        img.alt = item.title;

        imageDiv.appendChild(img);
        imagesContainer.appendChild(imageDiv);
    });
}

function displayError(message) {
    imagesContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryInput.value.trim();
    imagesContainer.innerHTML = '';

    if (query === '') {
        displayError('Пожалуйста, введите запрос.');
        return;
    }

    try {
        const imageData = await searchImages(query);
        displayImages(imageData);
    } catch (error) {
        displayError(error.message);
    }
});