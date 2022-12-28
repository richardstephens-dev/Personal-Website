dialog1 = `
/*
* Hey, you found my website.
* It's a bit empty, isn't it?
* We can change that.
* Let's start with a clean
* work area.
*/

* {
    transition: all 1s;
}

pre {
    white-space: pre-wrap;
}

.terminal {
    width: 50%;
    height: 50%;
    left: 7%;
    top: 7%;
    position: absolute;
    border-top: 30px solid #454545;
    z-index: 1;
    background-color: rgba(0,0,0,0);
}

.terminal-body {
    overflow: auto;
    width: 100%;
    height: 100%;
    margin-top: -1px;
    font-family: 'Ubuntu Mono';
    font-size: 1.2rem;
    color: #c1c1d2;
    background-color: rgba(30, 30, 30, 0.9);
    line-height: 1.5;
    user-select: none;
}

/*
* Can't forget the mobile users.
*/

@media screen and (max-width: 600px) {
    * {
        font-size: 0.75rem;
    }

    .terminal {
        display: inline-block;
        width: 100%;
        height: 50%;
        left: 0;
        top: 0;
    }

    .down-button {
        display: inline-block;
        z-index: 2;
        left: 50%;
        bottom: 10%;
    }

    .down-button, .up-button {
        position: absolute;
        border: none;
        background-color: rgba(0,0,0,0);
    }
    
    .down-button:hover, .up-button:hover {
        cursor: pointer;
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
}

/*
* Something you should know.
* I love a good CLI blinker.
*/

.blinker {
  margin-bottom: -2px;
  height: 15px;
  margin-left: -1px;
  border-left: 10px solid #bbbbbb;
  animation: blinker 0.9s steps(2, start) infinite;
}

@keyframes blinker {
  to {
    visibility: hidden;
  }
}

/*
* OK, let's finish up the visuals.
*/

.terminal-body::-webkit-scrollbar {
    width: 15px;
    background-color: rgba(30, 30, 30, 0.95);
}

.terminal-body::-webkit-scrollbar-thumb {
    background-color: #a6a6a6;
    width: 15px;
    border-radius: 0px;
    opacity: 0.1;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
    background-color: #bbbbbb;
    opacity: 0.9;
}

.terminal-body::-webkit-scrollbar-thumb:active {
    opacity: 0.9;
}

/*
* And of course we need syntax highlighting.
*/

/* TODO: Add syntax highlighting */

/*
* Ah. Now that's more like it.
* Hmm. What next?
* Where I'm at, it's always raining.
* Let's make it rain here too.
*/

.rainy-skies {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --tw-gradient-from: #1a1a24;
    --tw-gradient-to: #333346;
    --tw-gradient-stops: var(--tw-gradient-from),
        var(--tw-gradient-to);
    background-image: linear-gradient(to bottom,
        var(--tw-gradient-stops));
}

/*
* We'll animate some raindrops now with JavaScript.
* I'll let you in on a secret.
* The code is already written.
* We'll just need a bit of space at the
* top so we can make a button for you to push.
* Can you do me a favour and drag this
* element down so it's out of the way?
* (mobile users, just click the button)
* I can wait.
*/`

dialog2 = `
/*
* Thanks for that.
* We have a bit of breathing room now.
* Let's make it rain!
*/

.rain-button {
    z-index: 2; display: block; position: absolute;
    left: 25px; top: 25px;
    background-color: #454545;
    font-family: 'Ubuntu Mono'; font-size: 1.2rem;
    color: #c1c1d2; line-height: 1.5;
    user-select: none; cursor: pointer;
    border: 0px;
}
`

dialog3 = `
/*
* That's a bit cozier, isn't it?
* OK, last thing.
* This is a project portfolio website.
* Let's add some projects.
*/

@media screen and (max-width: 600px) {
    .up-button {
        display: block;
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 10%;
    }
}

/*
* Move the element back up
* To make space below.
*/
`

dialog4 = `
/*
* Thanks for that. First, let's
* settle in with a cup of warm tea...
*/

/* Add Tea */

/*
* And of course a good book...
*/

/* Add Book */

/*
* And enjoy another mildly
* egotistical personal portfolio website.
*/`