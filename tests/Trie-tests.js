import { expect } from 'chai';
import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';

describe('First Trie test', () => {
  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  })
  
  it('should be able to take in a word', () => {
    var completion = new Trie()
    assert.equal(completion.count === 0);
    completion.insert("pizza");
    completion.count();
    assert.equal(completion.count === 1);
    completion.insert('apple');
    completion.count();
    assert.equal(completion.count === 2);
  })
})
