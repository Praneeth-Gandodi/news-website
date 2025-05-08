const API_KEY_NEWS = 'd0d201c5b51f4a168694b2d9976f84aa';
const API_KEY_PEXELS = 'vNAXdG3jksl9MDt7vGQTNYw4PYQdeDaIx9QXAni2bV1WD6U4qncJvkpA';

async function fetchPexelsImage(keyword) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${keyword}&per_page=1`, {
            headers: { Authorization: API_KEY_PEXELS }
        });
        const data = await response.json();
        return data.photos[0]?.src.medium || 'https://via.placeholder.com/300x200';
    } catch (error) {
        return 'https://via.placeholder.com/300x200';
    }
}

async function fetchNews() {
    try {
        const newsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY_NEWS}`);
        const newsData = await newsResponse.json();
        const grid = document.getElementById('news-container');

        for (const article of newsData.articles) {
            const imageUrl = await fetchPexelsImage(article.title.split(' ')[0]);
            grid.innerHTML += `
                <div class="news-card">
                    <img src="${imageUrl}" alt="${article.title}">
                    <div class="news-content">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description available'}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchNews();
