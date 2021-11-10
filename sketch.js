/*
@author Kiwi
@date 2021-11-06

This will be a typingclub clone made in the spirit of our 15.301 project
 from 2004.


planning
    create passage class
    add sound: correct and incorrect.wav via p5.sound play()


commit schedule
    console typing with truncated passage
    don't clobber passage
    display passage with text()
    passage object ➜ highlights for correct vs incorrect
    index underscore in blue
    current gray horizontal marker
    don't take modifier keys as input; allow capital letters

planned features
    multiline passage. wrap: find next word and test its width
    reset button
    bottom line indicating total progress. 100% on right
    start typing animation: rectangle + bounce
    tracking wpm
    last word wpm
    wpm and accuracy counter on bottom
    scrolling text passage? before that we limit to screen size
    scoring animation, maybe with camera. viewport
        viewport https://forum.processing.org/two/discussion/14992/how-to-move-the-view-without-camera
        cameras https://behreajj.medium.com/cameras-in-processing-2d-and-3d-dc45fd03662c

 */


let font
let passage
let correctSound // audio cue for typing one char correctly
let incorrectSound // audio cue for typing one char incorrectly


function preload() {
    font = loadFont('data/lucida-console.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 32)

    correctSound = loadSound('data/correct.wav')
    incorrectSound = loadSound('data/incorrect.wav')

    passage = new Passage("Developers often work in teams, but it is not" +
        " uncommon to find a developer who works independently as a" +
        " consultant. ")
}


function draw() {
    background(234, 34, 24)

    passage.vectorRender()
}

function keyPressed() {
    // if we're at the end of the passage, stop


    // don't do anything if we detect SHIFT ALT CONTROL keycodes
    if (keyCode === SHIFT || keyCode === ALT || keyCode === CONTROL) {
        return
    }

    /*  if passage.getCurrentChar is our key, play correct sound, rewind it,
        passage.setCorrect(). otherwise, play and rewind incorrect sound.
        passage.setIncorrect().
     */

    if (passage.getCurrentChar() === key) {
        passage.setCorrect()
        correctSound.play()
    } else {
        passage.setIncorrect()
        incorrectSound.play()
    }
}