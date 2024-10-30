document.querySelectorAll('.videobook').forEach(item => {
    item.addEventListener('click', event => {
        const videoSource = item.getAttribute('data-video');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoPlayerContainer = document.getElementById('videoPlayerContainer');

        document.getElementById('videoSource').src = videoSource;
        videoPlayer.load();
        videoPlayerContainer.style.display = 'block';
        videoPlayer.play();
    });
});

document.getElementById('playPauseButton').addEventListener('click', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer.paused) {
        videoPlayer.play();
        this.textContent = 'Pause';
    } else {
        videoPlayer.pause();
        this.textContent = 'Play';
    }
});
