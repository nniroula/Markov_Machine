/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);   // regular expression, if it finds any given character in bewtween / and /, it splits at that character
    this.words = words.filter(c => c !== "");   // this is an array
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    // let markov_chain = {}; // order of inseted value may matter, so good to use Map than object
    let markov_chain = new Map();  // map object could return the list of arrays
    for(let i = 0; i<this.words.length; i++){
        let aWord = this.words[i];
        // let followingWord = this.words[i = 1];  // if it is the last word in the text, then use null
        let followingWord = this.words[i = 1] || null;
        // if markov_chain includes a word, add next word to it b/c word itself is an array in map object, includes() returns true or false
        // Map object has a method called has() that checks for a key in the map object
        if(markov_chain.has(aWord)){
            // get that word and add another word to that word array
            let getWord = markov_chain.get(aWord);
            getWord.push(followingWord);
        }else{ // if it does not have that word
            markov_chain.set(aWord, [followingWord]);
        }
    }
    // make an object reference of the Map object
    this.markov_chain = markov_chain;
    }
  //}

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    // we need to get a randdom key, which is a word in map object. keys() of map object gives keys back
    let getKeys = Array.from(this.markov_chain.keys());
    // apply math.random() method to get a single key
    let index = Math.floor(Math.random() * this.words.length);
    let choice = this.words[index]; // gives a word(or key)
    let getSingleKey = choice(keys);
    // create a holder for words
    let display = [];

    // if a word is a last word, null value
    while(display.length < numwords && getSingleKey !== null){
        display.push(getSingleKey);
        // set getSingleKey to different value
        getSingleKey = choice(this.markov_chain.get(key));
    }
    // return back an array
    // return display;
    return display.join(" ");
  }
}
// to use this class in another file, import it in another file. To do importing-do some exports here.
module.exports = {
    MarkovMachine
};