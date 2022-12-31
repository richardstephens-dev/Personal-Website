dialog1 = `
/*
* Hey, you found my website.
* I made this to store some of my projects.
* It's a bit empty, isn't it?
* We can change that.
* Let's start with a clean
* work area.
*/

pre {
    white-space: pre-wrap;
}

* {
    transition: all 1s;
    font-family: 'Ubuntu Mono';
    font-size: 1.2rem;
}

.terminal {
    width: 50%;
    height: 40%;
    position: absolute;
    border-top: 30px solid #454545;
    z-index: 2;
    background-color: rgba(0,0,0,0);
}

.terminal-body {
    overflow: auto;
    width: 100%;
    height: 100%;
    margin-top: -1px;
    color: #c1c1d2;
    background-color: rgba(30, 30, 30, 0.9);
    line-height: 1.5;
    user-select: none;
}

/*
* And just in case you're on mobile...
*/

@media screen and (max-width: 600px) {
    .terminal {
        width: 100%;
        display: inline-block;
        left: 0;
        right: 0;
        top: 0;
    }

    * {
        font-size: 0.75rem;
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
    background-image: linear-gradient(to bottom, #1a1a24, #333346);
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

.terminal-body::-webkit-scrollbar-thumb {
    opacity: 0.9;
}

/*
* Desktop users can drag the terminal element.
* For everyone else, let's add some buttons.
*/

@media screen and (max-width: 600px) {
    .down-button {
        display: inline-block;
        z-index: 1;
        bottom: 10%;
    }

    .down-button, .up-button {
        position: absolute;
        width: 30px;
        height: 30px;
        left: calc(50% - 15px);
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
*/`

dialog2 = `
/*
* Thanks for that.
* We have a bit of breathing room now.
*/

.rain-button {
    z-index: 1; display: block; position: absolute;
    width: 200px;
    height: auto;
    left: calc(50% - 75px);
    top: 5%;
    background-color: #454545;
    color: #c1c1d2; line-height: 1.5;
    user-select: none; cursor: pointer;
    border: 0px;
}

/*
* Let's make it rain!
*/
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
        z-index: 1;
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

:root {
    --teaSize: 256px;
}

.tea {
    display: block;
    position: absolute;
    z-index: 1;
    left: calc(33% - var(--teaSize));
    top: 45%;
    width: var(--teaSize);
    height: var(--teaSize);
    background-image: url('assets/images/tea.svg');
    background-position: 0 0;
    background-size: cover;
    animation: tea 1.5s steps(1) infinite;
}

@media screen and (max-width: 600px) {
    .tea {
        left: calc(50% - var(--teaSize) / 2);
        top: calc(40% + 110% / 3 - var(--teaSize) / 2);
    }

    .background {
        height: 150%;
    }
}

@keyframes tea {
    0% {
        background-position: 0;
    }
    17% {
        background-position: var(--teaSize 0);
    }
    33% {
        background-position: calc(2 * var(--teaSize)) 0;
    }
    50% {
        background-position: calc(3 * var(--teaSize)) 0;
    }
    67% {
        background-position: calc(4 * var(--teaSize)) 0;
    }
    83% {
        background-position: calc(5 * var(--teaSize)) 0;
    }
    100% {
        background-position: calc(6 * var(--teaSize)) 0;
    }
}

/*
* And of course a good book...
*/


:root {
    --bookWidth: calc(256px * 0.8);
    --bookHeight: 256px;
}


.book {
    display: block;
    position: absolute;
    z-index: 1;
    right: calc(33% - var(--bookWidth));
    top: 45%;
    width: var(--bookWidth);
    height: var(--bookHeight);
    background-image: url('assets/images/book.svg');
    background-position: 0 0;
    background-size: cover;
}

@media screen and (max-width: 600px) {
    .book {
        left: calc(50% - var(--bookWidth) / 2);
        top: calc(40% + 110% * 2 / 3 - var(--bookHeight) / 2);
    }
}

/*
* You thought I'd show you the book animation.
* Honestly, it was a pain.
* It's hidden away.
* If you want to find it, you know where to look.
*/

/*
* So there you have it!
* Enjoy yet another mildly
* egotistical personal portfolio website.
*
* I'm still learning, and this website
* was my way to teach myself bit of
* CSS, JavaScript, and html.
* If you find any bugs or have
* any feedback, please let me know.
*
* Contact:
* Richard Stephens
* richard.stephens.15@ucl.ac.uk
* +44 0 7704 930 825
*/
`


bookDialog = `
#book-content {
    position: absolute;
    z-index: 1;
    width: 45%;
    height: 60%;
    background-color: transparent;
    top: 35%;
    left: 53%;
}

#book-back-button,
#book-forward-button {
    position: absolute;
    z-index: 2;
    width: calc(var(--bookWidth) / 2);
    height: 75%;
    background-color: transparent;
    border: 0px;
    cursor: pointer;
    top: 25%;
}

#book-back-button {
    left: 0;
}

#book-forward-button {
    right: 0;
}

#toc {
    right: 33%;
    top: 20%;
}

#python-button,
#webdev-button,
#assembly-button,
#python-page,
#webdev-page,
#assembly-page,
#toc {
    width: auto;
    height: auto;
    display: none;
    z-index: 3;
    color: #454545;
    background-color: transparent;
    border: 0px;
    font-family: 'VT323', 'monospace';
    font-size: 1rem;
}

#python-button,
#webdev-button,
#assembly-button,
{
    left: 50%;
    position: absolute;
    width: auto;
    height: calc(var(--bookHeight) / 4);
}

#python-button:hover, #webdev-button:hover, #assembly-button:hover {
    cursor: pointer;
}

#python-button {
    top: 30%;
}

#webdev-button {
    top: 60%;
}

#assembly-button {
    top: 90%;
}

.idle-to-toc {
    cursor: pointer;
    animation: idle-toc 1s steps(1);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

.toc-to-idle {
    cursor: pointer;
    animation: idle-toc 1s steps(1);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: reverse;
}

@keyframes idle-toc {
    0% {
        background-position: 0 0;
    }

    17% {
        background-position: calc(42 * var(--bookWidth)) 0;
    }

    33% {
        background-position: calc(41 * var(--bookWidth)) 0;
    }

    50% {
        background-position: calc(40 * var(--bookWidth)) 0;
    }

    67% {
        background-position: calc(39 * var(--bookWidth)) 0;
    }

    83% {
        background-position: calc(38 * var(--bookWidth)) 0;
    }

    100% {
        background-position: calc(37 * var(--bookWidth)) 0;
    }
}

.toc-to-page {
    cursor: pointer;
    animation: toc-page 1s steps(1);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

.page-to-toc {
    cursor: pointer;
    animation: toc-page 1s steps(1);
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: reverse;
}

@keyframes toc-page {
    0% {
        background-position: calc(37 * var(--bookWidth)) 0;
    }

    8% {
        background-position: calc(36 * var(--bookWidth)) 0;
    }

    17% {
        background-position: calc(35 * var(--bookWidth)) 0;
    }

    25% {
        background-position: calc(34 * var(--bookWidth)) 0;
    }

    33% {
        background-position: calc(33 * var(--bookWidth)) 0;
    }

    42% {
        background-position: calc(32 * var(--bookWidth)) 0;
    }

    50% {
        background-position: calc(31 * var(--bookWidth)) 0;
    }

    58% {
        background-position: calc(30 * var(--bookWidth)) 0;
    }

    67% {
        background-position: calc(29 * var(--bookWidth)) 0;
    }

    75% {
        background-position: calc(28 * var(--bookWidth)) 0;
    }

    83% {
        background-position: calc(27 * var(--bookWidth)) 0;
    }

    92% {
        background-position: calc(26 * var(--bookWidth)) 0;
    }

    100% {
        background-position: calc(25 * var(--bookWidth)) 0;
    }
}

.idle,
.toc,
.page {
    display: block;
    position: absolute;
    z-index: 1;
    right: calc(33% - var(--bookWidth));
    top: 45%;
    width: var(--bookWidth);
    height: var(--bookHeight);
    background-size: cover;
    background-image: url('assets/images/book.svg');
}

@media screen and (max-width: 600px) {

    .idle,
    .toc,
    .page {
        left: calc(50% - var(--bookWidth) / 2);
        top: calc(40% + 110% * 2 / 3 - var(--bookHeight) / 2);
    }
}

.idle {
    background-position: 0 0;
}

.toc {
    background-position: calc(37 * var(--bookWidth)) 0;
}

.page {
    background-position: calc(1 * var(--bookWidth)) 0;
}
`

initStyles = `
.rain-button,
.down-button,
.up-button,
.book,
#book-back-button,
#book-forward-button,
#toc,
#python-button,
#webdev-button,
#assembly-button,
#python-page,
#webdev-page,
#assembly-page {
    display: none;
}

#skip-button {
    z-index: 1;
    display: block;
    position: absolute;
    width: 200px;
    height: auto;
    right: 5%;
    bottom: 5%;
    background-color: #454545;
    color: #c1c1d2;
    line-height: 1.5;
    user-select: none;
    cursor: pointer;
    border: 0px;
}
`