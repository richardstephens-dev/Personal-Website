var makeItRain = function () {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        //couple random numbers to use for various randomizations
        //random number between 98 and 1
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        //random number between 5 and 2
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
        //increment
        increment += randoFiver;
        //add in a new raindrop with various randomizations to certain CSS properties
        //drops += '<div class="drop absolute top-0 bg-gradient-to-b from-cloudy-6 to-cloudy-7 rounded-full mix-blend-multiply filter blur-3xl" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        drops += '<div class="drop rounded-full top-0" style="left: ' + increment
            + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100)
            + '%; animation-delay: 0.' + randoHundo
            + 's; animation-duration: 0.5' + randoHundo
            + 's;"><div class="stem bg-gradient-to-b from-cloudy-6 to-cloudy-7" style="animation-delay: 0.' + randoHundo
            + 's; animation-duration: 0.5' + randoHundo
            + 's;"></div></div>';
        backDrops += '<div class="drop rounded-full top-0" style="left: ' + increment
            + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100)
            + '%; animation-delay: 0.' + randoHundo
            + 's; animation-duration: 0.5' + randoHundo
            + 's;"><div class="stem bg-gradient-to-b from-cloudy-6 to-cloudy-7" style="animation-delay: 0.' + randoHundo
            + 's; animation-duration: 0.5' + randoHundo
            + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);

    console.log(drops)
}

makeItRain();