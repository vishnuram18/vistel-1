document.addEventListener("DOMContentLoaded", function() {
    const continueWatchingList = document.getElementById("continueWatchingList");
    const audioPlayerContainer = document.getElementById("audioPlayerContainer");
    const audioPlayer = document.getElementById("audioPlayer");
    const audioSource = document.getElementById("audioSource");
    const playPauseButton = document.getElementById("playPauseButton");

    // Sample data for voicebooks
    const voicebooks = [
        { title: "Voicebook Title 1", author: "Author 1", audio: "audio1.mp3", image: "image/haunting adeline.jpg" },
        { title: "Voicebook Title 2", author: "Author 2", audio: "audio2.mp3", image: "image/pexels-artem-saranin-1496373.jpg" }
    ];

    // Load the continue watching list
    loadContinueWatching();

    function loadContinueWatching() {
        continueWatchingList.innerHTML = ""; // Clear the list before populating

        voicebooks.forEach(voicebook => {
            const savedTime = localStorage.getItem(voicebook.audio);
            if (savedTime && parseFloat(savedTime) > 0) {
                const item = document.createElement("div");
                item.classList.add("item");
                item.setAttribute("data-audio", voicebook.audio);

                const img = document.createElement("img");
                img.src = voicebook.image;
                img.alt = voicebook.title;

                const title = document.createElement("h3");
                title.textContent = voicebook.title;

                item.appendChild(img);
                item.appendChild(title);

                // Click event to resume playback
                item.addEventListener("click", function() {
                    playVoicebook(voicebook.audio, savedTime);
                });

                continueWatchingList.appendChild(item);
            }
        });

        // Show "Continue Watching" section only if there are items to continue
        const sectionTitle = document.querySelector(".section-title");
        if (continueWatchingList.childElementCount === 0) {
            sectionTitle.style.display = "none";
        } else {
            sectionTitle.style.display = "block";
        }
    }

    function playVoicebook(audioFile, savedTime) {
        audioSource.src = audioFile;
        audioPlayer.load();
        audioPlayer.currentTime = savedTime;
        audioPlayerContainer.style.display = "flex";
        audioPlayer.play();
        playPauseButton.textContent = "Pause";
    }

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
