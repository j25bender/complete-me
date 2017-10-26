import fs from 'fs';
import { expect } from 'chai';
import { assert } from 'chai';
import { Trie } from '../lib/Trie.js';
import chai from 'chai';
chai.should();

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('Trie Tests', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('Expect Trie to be a function', () => {
    expect(Trie).to.be.a('function');
  })

  it('Should have a property root assigned to a node', () => {
    trie.insert('music')
    trie.should.have.property('root').equal(trie.root);
  })

  it('Should have a property wordCount with an initial value of 0', () => {
    trie.should.have.property('wordCount').equal(0);
  })

  describe('Insert Tests', () => {

    it('Expect Trie to have a method insert', () => {
      expect(trie).itself.to.respondTo('insert');
    })

    it('Should have a property wordCount that increases when a word is inserted', () => {
      trie.insert('chupacabra');
      trie.should.have.property('wordCount').equal(1);
    })

    it('Should be able to take in a word', () => {
      trie.insert('pizza');
      expect(
        trie.root.children
        .p.children
        .i.children
        .z.children
        .z.children
        .a.letter).to.equal('a');
    })

    it('Should be able to set wordEnd to true', () => {
      trie.insert('pizza');
      expect(
        trie.root.children
        .p.children
        .i.children
        .z.children
        .z.children
        .a.wordEnd
      ).to.equal(true);
    })

    it('Should be able to take in TWO words', () => {
      trie.insert('turtle');
      trie.insert('power');

      expect(
        trie.root.children
        .t.children
        .u.children
        .r.children
        .t.children
        .l.children
        .e.letter
      ).to.equal('e');

      expect(
        trie.root.children
        .p.children
        .o.children
        .w.children
        .e.children
        .r.letter
      ).to.equal('r');
    })
    
    it('Expect Trie to create a Trie object', () => {
      expect(trie).to.be.an('object')
    })
  })


  describe('Suggest Tests', () => {

    it('Expect Trie to have a method suggest', () => {
      expect(trie).itself.to.respondTo('suggest');
    })

    it('Expect suggest to return an array', () => {
      expect(trie.suggest('')).to.deep.equal([]);
    });
  })

  describe('findSuggestions Tests', () => {

    it('Expect Trie to have a method findSuggestions', () => {
      expect(trie).itself.to.respondTo('findSuggestions');
    })
  })

  describe('Populate Tests', () => {

    it('Expect Trie to have a method populate', () => {
      expect(trie).itself.to.respondTo('populate');
    })

    it('Expect Trie to populate dictionary of 235,886 words', () => {
      trie.populate(dictionary);
    expect(dictionary.length).to.equal(235886);
  })

  })

  describe('Sad Path Tests', () => {
    it('Should NOT overwrite word if inserted twice', () => {
      trie.insert('recursion');
      trie.insert('recursion');
      trie.should.have.property('wordCount').equal(1);
    })
  })
})