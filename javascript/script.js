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
