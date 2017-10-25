import { Node } from './Node.js';

export class Trie {
  constructor() {
    this.root = new Node(''); // instanstiating a new Node, assigning empty string to letter
    this.wordCount = 0; // keeps count of number of words
  }

  insert(word) { // insert('pizza')
    let word = word.split(''); // turn word into comma seperated array  // [ p, i, z, z, a ]
    let currentNode = this.root; // root node

    word.forEach( (letter) => { // turn letters into nodes
      if ( !currentNode.children[ letter ] ) { // if letter does not exist in children object
        currentNode.children[ letter ] = new Node( letter ); // create node for letter
      }
      currentNode = currentNode.children[ letter ]; // travel to children letter node
    });

    if(!currentNode.wordEnd){ // if word is not already in trie
      this.wordCount++; // increase word count
      currentNode.wordEnd = true; 
    }
  }

  suggest(phrase) {
    phrase = phrase.toLowerCase().split(''); // sets phrase to all lowercase and as csa 

    let currentNode = this.root; // assigning currentNode to root

    phrase.forEach( (letter) => {
      currentNode = currentNode.children[ letter ];
    })
    if(!currentNode || !currentNode.children) { // if suggested phrase doesn't match anything in array or has no children
      return []; // if the condition met then return an empty array
    } else { // if that condition isn't met then node exists 
      return this.findSuggestions(currentNode, phrase.join('')); //
    }
  }

  findSuggestions(currentNode, phrase, suggestions = []) { // currentNode caNode phrase 'ca' suggestions empty array
    let childrenLetters = Object.keys(currentNode.children); // gives all children of caNode ['r', 't']

    childrenLetters.forEach((childLetter) => { // iterates over currentNodes children letters
      let letterNode = currentNode.children[childLetter]; // after first iteration carNode
      let newPhrase = phrase + childLetter; // after first iteration child letter gets added 'car'

      if (letterNode.isWord) { // 'car' is word wordEnd true
        suggestions.push({word: newPhrase, popCount: letterNode.popularity}); // 'car' gets added to suggestions array
      }
      this.findSuggestions(letterNode, newPhrase, suggestions); // if not a word check next child letter  
    });
    suggestions.sort((a,b) => { // sort() is unstable a,b add stability
      return b.popCount - a.popCount; // stabilizing in action
    })
    return suggestions.map(wordObj => { // mapping over suggestion array to 
      return wordObj.word; // only returning the word from wordObj
    });
  }

  populate(dictionary) { // populates using built in word array dictionary. just for testing
    dictionary.forEach( word => {
      this.insert(word);
    });
  }

  select(word) { // passing in a selected word
    let currentNode = this.root; // assigning current node to this.root

    word = word.split(''); // word gets csa ed ['c', 'a', 't']
    word.forEach( letter => { //iterates over each letter
      currentNode = currentNode.child[ letter ]; // traveling down the array 
    });
    currentNode.popularity++;
  }
}
