import fs from 'fs';
import { expect } from 'chai';
import { Trie } from '../lib/Trie.js';
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Trie test', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  })

  // Should be able to take in a word
  it('Should be able to take in a word', () => {
    trie.insert('pizza');
    expect(
      trie.root.child
      .p.child
      .i.child
      .z.child
      .z.child
      .a.letter).to.equal('a');
  })

  // Should be able to insert two words
  it('Should be able to take in a word', () => {
    trie.insert('pizza');
    trie.insert('pickle');

    expect(
      trie.root.child
      .p.child
      .i.child
      .z.child
      .z.child
      .a.letter
    ).to.equal('a');

    expect(
      trie.root.child
      .p.child
      .i.child
      .c.child
      .k.child
      .l.child
      .e.letter
    ).to.equal('e');
  })

  // Should keep a count of how many words inserted
  
  it.skip('should create a Trie object', () => {
    let completion = new Trie();
    expect(completion).to.be.an('object')
  })

  it.skip('should populate a dictionary', () => {
    let completion = new Trie();
    completion.populate(dictionary);
    expect(completion.count).to.equal(235886);
  })
})
