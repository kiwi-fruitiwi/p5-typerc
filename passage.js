/*
    displays a passage for typing, keeping track of correct and incorrect
     letters by highlighting them
 */

class Passage {
    constructor(text) {
        // set up our font so we can determine our text width

        this.text = text
        this.index = 0 // where in the passage we're currently typing
        this.correctList = [] // booleans recording character correctness

        /*  keep track of where we last got a character incorrect; use this
         to prevent marking a previously incorrect char correct once we succeed.
         */
        this.lastIncorrectIndex = -1
        this.textWidth = textWidth(' ') // the width of a space char
    }


    // renders this passage using vectors instead of constant offsets
    vectorRender() {
        const Y_OFFSET = 100
        const X_OFFSET = 50

        let cursor = new p5.Vector(X_OFFSET, Y_OFFSET)

        // display the entire passage without text wrap
        for (let i=0; i<this.text.length; i++) {

            fill(0, 0, 100, 70)
            text(this.text[i], cursor.x, cursor.y)


            // modify cursor position to where the next letter should be
            cursor.x += textWidth(this.text[i])
        }
    }

    render() {
        noStroke()
        const H_OFFSET = 50
        const CORRECT_HIGHLIGHT_HEIGHT = 34
        const BELOW_FLOOR_CHAR_PADDING = 8 // for tails of p's, g's, y's, etc.
        let V_OFFSET = 100

        // display characters in passage and highlight for correct vs incorrect
        for (let i=0; i < this.text.length; i++) {
            fill(0, 0, 100, 70)

            /*  TODO multi-line check
                find next word. if that word's width plus our current pos.x
                 is greater than our screen, V_OFFSET += line height

             */

            text(this.text[i], H_OFFSET+this.textWidth*i, V_OFFSET)

            /* TODO correct / incorrect highlights */

            /*  if we've typed up to the current char:
                    display a green rect background if we typed it correctly
                    otherwise display the red background
             */
            if (i < this.index) {
                if (this.correctList[i])
                    fill(94, 100, 90, 15)
                else
                    fill(0, 100, 100, 20)
                rect( // negative height makes rectangle grow upward on screen
                    H_OFFSET+this.textWidth*i+1,
                    V_OFFSET+BELOW_FLOOR_CHAR_PADDING,
                    this.textWidth-2,
                    -CORRECT_HIGHLIGHT_HEIGHT,
                    2) // rounded rectangle corners
            } else {
                // don't draw a rect background if we haven't typed up to
                // this index
            }
        }


        /* TODO display underline cursor for current character */
        fill(0, 0, 100)
        rect(
            H_OFFSET+this.textWidth*this.index+1, V_OFFSET+10,
            this.textWidth-2, 2,
            2)


        /* TODO line above current word (delimited by whitespace) */
        // find index of next and previous whitespace chars
        let nextDelimiterIndex = this.text.indexOf(" ", this.index)
        let previousDelimiterIndex = this.text.lastIndexOf(" ", this.index)

        // +1 because we don't want the line to go over the previous
        // whitespace char
        // fill(216, 100, 100, 50) // blue
        fill(0, 0, 80, 30) // gray
        rect(
            H_OFFSET+this.textWidth*(previousDelimiterIndex+1)+1,
            V_OFFSET+BELOW_FLOOR_CHAR_PADDING-CORRECT_HIGHLIGHT_HEIGHT-2,
            this.textWidth*(nextDelimiterIndex-previousDelimiterIndex),
            -2,
            2)  // rounded rect corners

    }

    getCurrentChar() {
        return this.text[this.index]
    }

    // set the current char to correct
    setCorrect() {
        // if we've already gotten this char incorrect, don't add a correct
        // value to correctList
        if (this.lastIncorrectIndex === this.index) {
            // do nothing
        } else {
            this.correctList.push(true)
            this.incrementIndex()
        }

        console.assert(this.correctList.length === this.index)
    }

    // set the current char to be incorrect
    setIncorrect() {
        // only set incorrect for an index once!
        if (this.lastIncorrectIndex !== this.index) {
            this.correctList.push(false)
            this.lastIncorrectIndex = this.index

            /*
                typingclub.com has two options:
                    an incorrect advances the cursor, skipping the char
                    an incorrect does not advance, requiring a correction

                current code doesn't block on errors
             */

            this.incrementIndex()
        }
    }

    decrementIndex() {
        this.index -= 1
    }

    incrementIndex() {
        this.index += 1
    }

    /*
        string representation of correct and incorrect chars
     */
    toString() {
        let correctRep = []
        for (let c of this.correctList) {
            if (c)
                correctRep.push('.')
            else
                correctRep.push('*')
        }

        // TODO what is the equivalent of join in js?
        return this.text + "\n" + correctRep.join('') + '\n'
    }
}