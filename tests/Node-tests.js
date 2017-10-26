import { Node } from '../lib/Node.js';
import { expect } from 'chai';
import chai from 'chai';
chai.should();

describe('Node Tests', () => {
	let node;

  beforeEach(() => {
    node = new Node();
  });

  it('Expect Node to be a function', () => {
    expect(Node).to.be.a('function');
  })

  it('Should have a property letter', () => {
    node.should.have.property('letter');
  })

  it('Expect Node to have a letter when passed in', () => {
  	node.letter = 'b';
    expect(node.letter).to.equal('b');
  })

  it('Should have a property children', () => {
    node.should.have.property('children');
  })

  it('Should start with an empty object assigned to children', () => {
    node.children.should.be.an('object')
  })

  it('Should have a property wordEnd', () => {
    node.should.have.property('wordEnd');
  })

  it('Should have a property popularity', () => {
    node.should.have.property('popularity').equal(0);
  })
})
