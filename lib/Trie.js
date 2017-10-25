import { Node } from './Node.js';

export class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
    this.suggestions = [];
  }

  // insert('pizza')
  insert(word) {
    // increase word count
    this.count++; 

    // turn word into comma seperated array
    let letters = word.split('');
    // [ p, i, z, z, a ]

    // root node
    let currentNode = this.root;

    // turn letters into nodes
    letters.forEach( (letter) => {

      // if letter does not exist in child object
      if ( !currentNode.children[ letter ] ) {

        // create node for letter
        currentNode.children[ letter ] = new Node( letter );
      }

      // travel to children letter node
      currentNode = currentNode.children[ letter ];
    });

    currentNode.wordEnd = true;
  }

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    });
  }

  select(word) {
    let currentNode = this.root;

    word = word.split('');
    word.forEach( letter => {
      currentNode = currentNode.child[ letter ];
    });
    currentNode.popularity++;
  }

  suggest(str) {
    str = str.split('');

    let currentNode = this.root;

    str.forEach((letter) => {
      currentNode = currentNode.children[letter];
    });
    return this.findSuggestions(currentNode, str.join(''));
  }

  findSuggestions(currentNode, str) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];

    childrenLetters.forEach((childLetter) => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = str + childLetter;

      if (letterNode.isWord) {
        suggestions.push(newPhrase);
      }
      suggestions.push(...this.findSuggestions(letterNode, newPhrase));  
    });
    return this.findSelections(suggestions);
  }
}
