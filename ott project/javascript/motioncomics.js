// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item'); // Select all motion comic items
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');
    
    // Optional: Close button (Add this button in your HTML if not already present)
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;'; // Close icon (×)
    videoPlayerContainer.appendChild(closeButton);

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

    // Optional: Close video player if user clicks outside of the video area
    window.addEventListener('click', function (event) {
        if (event.target === videoPlayerContainer) {
            videoPlayer.pause();
            videoPlayerContainer.classList.remove('show');
        }
    });
});
