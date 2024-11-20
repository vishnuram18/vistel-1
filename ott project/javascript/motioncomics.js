// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item'); // Select all motion comic items
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    const closeButton = document.querySelector('.close-button');

    // Function to show the video player
    function showVideoPlayer(videoFile) {
        videoSource.src = `../videos/${videoFile}`; // Ensure the path to your video files is correct
        videoPlayer.load();
        videoPlayer.play();
        videoPlayerContainer.classList.add('show'); // Slide-up animation
    }

    // Loop through all items and add click event listeners
    items.forEach(item => {
        item.addEventListener('click', function () {
            const videoFile = item.getAttribute('data-video');
            if (videoFile) {
                showVideoPlayer(videoFile);
            }
        });
    });

    // Close video player when clicking the close button
    closeButton.addEventListener('click', function () {
        videoPlayer.pause(); // Pause the video
        videoPlayerContainer.classList.remove('show'); // Slide-down animation
    });

    // Pause the video and hide the player when the video ends
    videoPlayer.addEventListener('ended', function () {
        videoPlayerContainer.classList.remove('show');
    });
});
