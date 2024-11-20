function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Check out Vistel - Your favorite motion comics in one place!");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Vistel - Your favorite motion comics in one place! 🎬");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Vistel - Motion Comics Platform");
    const summary = encodeURIComponent("Your favorite motion comics in one place!");
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out Vistel - Your favorite motion comics in one place! 🎬");
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}
