document.addEventListener('DOMContentLoaded', () => {
    const accessKey = 'hqWu4qTd9DMEABwseOhbI64hRRFeokfdtDecm_ONjLs'; // Замените на свой API-ключ

    const photoElement = document.getElementById('photo');
    const photographerElement = document.getElementById('photographer');
    const likeCounterElement = document.getElementById('likesCount');
    const likeButton = document.getElementById('likeButton');

    let likesCount = localStorage.getItem('likesCount') || 0;

    async function fetchRandomPhoto() {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
            const data = await response.json();

            if (data && data.urls && data.user) {
                const photoUrl = data.urls.regular;
                const photographerName = data.user.name;

                photoElement.src = photoUrl;
                photographerElement.textContent = `Photographer: ${photographerName}`;
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    }

    function likePhoto() {
        try {
            likesCount++;
            likeCounterElement.textContent = likesCount;
            localStorage.setItem('likesCount', likesCount);
        } catch (error) {
            console.error('Error liking photo:', error);
        }
    }

    fetchRandomPhoto();

    // Привязываем событие к кнопке лайка
    likeButton.addEventListener('click', likePhoto);
});
