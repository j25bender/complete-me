const Node = require('./Node.js');

class Trie {
  constructor() {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    word = word.split('');
    let currentNode = this.root;
    word.forEach( (letter) => {      
      if ( !currentNode.children[ letter ] ) {
        currentNode.children[ letter ] = new Node( letter );        
      }
        currentNode = currentNode.children[ letter ];
    });

    if ( !currentNode.wordEnd ) {
      this.wordCount++;
      currentNode.wordEnd = true;       
    }
  }

  findNode(word) {
    let currentNode = this.root;
    
    word = word.toLowerCase().split('');
    
    word.forEach( letter => {
      if (currentNode === undefined) {
        return [];
      } else {
        currentNode = currentNode.children[ letter ];        
      }
    });
    return currentNode;
  }

  select(word) {
    let currentNode = this.findNode(word);    
    currentNode.popularity++;
  }

  suggest(word) {
    let currentNode = this.findNode(word);
    
    if ( !currentNode || !currentNode.children ) {
      return [];
    } else {      
      return this.findSuggestions(currentNode, word );
    }
  }

  findSuggestions(currentNode, word, suggestions = []) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach( (childLetter) => {
      let letterNode = currentNode.children[ childLetter ];
      let newWord = word + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push( {word: newWord, popCount: letterNode.popularity} );
      }
      this.findSuggestions(letterNode, newWord, suggestions);
    });

    suggestions.sort( (a, b) => {
      return b.popCount - a.popCount;
    }); 
    return suggestions.map( (wordObj) => {
      return wordObj.word;
    });
  }

  delete(word) { 
    let currentNode = this.traverse(word);
    currentNode.wordEnd = false;
    this.deleteHelper(word); 
  }

  deleteHelper(word) {
    while (word.length) {
      let lastLetter = word.slice(-1);
      word = word.slice(0, -1);

      let currentNode = this.traverse(word);

      if(Object.keys(currentNode.children[lastLetter].children).length &&
        !currentNode.children[lastLetter].wordEnd) {
          console.log(Object.keys(currentNode.children[lastLetter].children).length)
          delete(currentNode.children[lastLetter]);
      }
    }
  }

  traverse(word) {
    let currentNode = this.root;
    let wordArray = [...word];

    wordArray.forEach( letter => {
      currentNode = currentNode.children[letter];
    });

    return currentNode;
  }

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    });
  }
}

module.exports = Trie;