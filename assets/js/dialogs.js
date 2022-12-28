dialog1 = `
/*
* Hey, you found my website.
* I made this to store some of my projects.
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

    /*
    * This button doesn't do
    * anything yet, but it will
    * soon. Prep work. :)
    */

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
* Can't forget the background!
*/

.background {
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
* OK, let's add a CLI style blinker.
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
* And swap out the scrollbar!
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
* Ah. Now that's more like it.
* Hmm. What next?
* Let's do what any good
* developer wants use
* their skills to do:
* Make it rain!
* We'll just need a bit of
* space at the top.
* Can you do me a favour and
* move this element down?
* I can wait.
* ...
* (mobile users, remember what I said?
* The button does something now.)
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
* Well... that's not what I had
* in mind when I said "make it rain".
* But hey, it's a bit cozier, isn't it?
* And puns are fun.
* OK, last thing.
* This is a project portfolio
* website after all.
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
*
* I'm still learning, and this website
* was my way to teach myself bit of JavaScript.
* If you find any bugs or have
* any feedback, please let me know.
*
* Contact:
* Richard Stephens
* richard.stephens.15@ucl.ac.uk
* +44 0 7704 930 825
*/`