document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item'); // Select all motion comic items
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const playPauseButton = document.getElementById('playPauseButton');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');

    // Loop through all items and add event listeners
    items.forEach(item => {
        item.addEventListener('click', function () {
            // Get the video source for the clicked item
            const videoFile = item.getAttribute('data-video');
            
            if (videoFile) {
                // Set the video source and play the video
                videoSource.src = `../videos/${videoFile}`; // Ensure the path to your video files is correct
                videoPlayer.load();
                videoPlayer.play();

                // Show the video player container
                videoPlayerContainer.style.display = 'flex';

                // Change button text to "Pause"
                playPauseButton.textContent = 'Pause';
            } else {
                console.error('No video file found!');
            }
        });
    });

    // Toggle play/pause functionality
    playPauseButton.addEventListener('click', function () {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    });
});
