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

    render() {
        noStroke()
        let H_OFFSET = 50

        // display characters in passage and highlight for correct vs incorrect
        for (let i=0; i < this.text.length; i++) {
            fill(0, 0, 100, 70)
            text(this.text[i], H_OFFSET+this.textWidth*i, 100)


            /*  if we've typed up to the current char:
                    display a green rect background if we typed it correctly
                    otherwise display the red background
             */
            if (i < this.index) {
                if (this.correctList[i])
                    fill(94, 100, 90, 15)
                else
                    fill(0, 100, 100, 20)
                rect(
                    H_OFFSET+this.textWidth*i+1, 100+10,
                    this.textWidth-2, -46, 2)
            } else {
                // don't draw a rect background if we haven't typed up to
                // this index
            }
        }

        // display cursor
        fill(216, 100, 100, 50) // blue
        rect(
            H_OFFSET+self.textWidth*self.index+1, 100+10,
            self.textWidth-2, 2,
            2)

        // display line above current word (delimited by whitespace)
        // find index of next and previous whitespace chars
        let nextDelimiterIndex = this.text.indexOf(" ", this.index)
        let previousDelimiterIndex = this.text.lastIndexOf(" ", this.index)

        // +1 because we don't want the line to go over the previous
        // whitespace char
        rect(
            H_OFFSET+this.textWidth*(previousDelimiterIndex+1)+1, 66-6,
            this.textWidth*(nextDelimiterIndex-previousDelimiterIndex)-2, 2,
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