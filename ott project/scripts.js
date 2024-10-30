document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('manga.html')) {
        populateMangaSections();
    }
});

function populateMangaSections() {
    const continueReadingData = [
        { title: 'Manga 1', chapter: 'Chapter 3', author: 'Author 1' },
        { title: 'Manga 2', chapter: 'Chapter 5', author: 'Author 2' }
    ];

    const moreMangaData = [
        { title: 'Manga 3', author: 'Author 3' },
        { title: 'Manga 4', author: 'Author 4' },
        { title: 'Manga 5', author: 'Author 5' }
    ];

    // Populate Continue Reading list
    const continueReadingList = document.getElementById('continueReadingList');
    continueReadingData.forEach(manga => {
        const listItem = document.createElement('li');
        listItem.textContent = `${manga.title} - ${manga.chapter} by ${manga.author}`;
        continueReadingList.appendChild(listItem);
    });

    // Populate More Manga list
    const moreMangaList = document.getElementById('moreMangaList');
    moreMangaData.forEach(manga => {
        const listItem = document.createElement('li');
        listItem.textContent = `${manga.title} by ${manga.author}`;
        moreMangaList.appendChild(listItem);
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");
    const audioPlayerContainer = document.getElementById("audioPlayerContainer");
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");
    const playPauseButton = document.getElementById("playPauseButton");

    items.forEach(item => {
        item.addEventListener("click", function() {
            const audioFile = this.getAttribute("data-audio");
            audioSource.src = audioFile;
            audioPlayer.load();

            // Load saved progress
            const savedTime = localStorage.getItem(audioFile);
            if (savedTime) {
                audioPlayer.currentTime = savedTime;
            }

            audioPlayerContainer.style.display = "flex";
            audioPlayer.play();
            playPauseButton.textContent = "Pause";
        });
    });

    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = "Play";
        }
    });

    audioPlayer.addEventListener("timeupdate", function() {
        const audioFile = audioSource.src;
        if (audioFile) {
            localStorage.setItem(audioFile, audioPlayer.currentTime);
        }
    });
});
