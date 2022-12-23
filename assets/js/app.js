// Add an eventlistener to trigger the first time the page is loaded
window.addEventListener("load", function () {
    // Start the rain effect
    typeText("startText", animateRain);
});

// event listener to every click on the page
window.addEventListener("click", function (event) {
    animateLightning(event);
});