/*
@author Kiwi
@date 2021-11-06

This will be a typingclub clone made in the spirit of our 15.301 project
 from 2004.


planning
    create passage class
    add sound: correct and incorrect.wav via p5.sound play()


 */
let font

function preload() {
    font = loadFont('data/Meiryo-01.ttf')
}


function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 32)
}


function draw() {
    background(234, 34, 24)


}

function keyPressed() {
    // if we're at the end of the passage, stop

    // don't do anything if we detect SHIFT ALT CONTROL keycodes

    /*  if passage.getCurrentChar is our key, play correct sound, rewind it,
        passage.setCorrect(). otherwise, play and rewind incorrect sound.
        passage.setIncorrect().
     */

}