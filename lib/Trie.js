export default class Trie {
  constructor() {
    this.root = new Node('');
    this.num = 0;
  }
  insert (word) {
    this.num++;
    word = word.split(''); // ['p', 'i', 'z', 'z', 'a']
    let currentPosition = this.root.children;
    let currentParent = this.root;
    if (this.root.children.hasOwnProperty('p')) {
      currentPosition = currentPosition['p'].children;
    }
    for (let i = 0; i < word.length; i++) {
      currentPosition[word[i]] = new Node(word[i]); // {'p': new Node('p')}
      currentPosition = currentPosition[word[i]].children; // this.root.children['p'].children
      currentParent = currentParent.children[word[i]];
    }
    currentParent.wordEnd = true;
  }
  suggest() {
  }
  populate() {
  }
  count() {
  }
  select() {
  }
}
// if the letter is already in the Trie
// else do the insert() function