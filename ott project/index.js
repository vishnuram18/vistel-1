document.getElementById('genre-button').addEventListener('click', () => {
    const genreList = document.getElementById('genre-list');
    const isVisible = genreList.style.transform === 'translateX(0px)';
    genreList.style.transform = isVisible ? 'translateX(-250px)' : 'translateX(0px)';
});
