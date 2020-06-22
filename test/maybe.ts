import 'mocha';
import { expect } from 'chai';
import '../src/maybe';
import { Just, Maybe, Nothing } from 'purify-ts/Maybe';

describe('Maybe', () => {

  it('should check for Maybe', () => {
    expect(Nothing).to.be.Maybe;
    expect(Just([])).to.be.Maybe;
    expect(Maybe.zero()).to.be.Maybe;
    expect(Maybe.fromNullable('foo')).to.be.Maybe;
  });

  it('should check for not Maybe', () => {
    expect(null).to.not.be.Maybe;
    expect('foo').to.not.be.Maybe;
  });

  it('should check for Nothing', () => {
    expect(Nothing).to.be.Nothing;
    expect(Maybe.fromNullable(null)).to.be.Nothing;
  });

  it('should check for not Nothing', () => {
    expect('thing').to.not.be.Nothing;
    expect(Just(5)).to.not.be.Nothing;
  });

  it('should check for a Just', () => {
    expect(Just(5)).to.be.Just();
    expect(5).to.not.be.Just();
    expect(Maybe.fromNullable('foo')).to.be.Just;
    expect(Just(5).map(v => v)).to.be.Just;
  });

  it('should check for not a Just', () => {
    expect(Nothing).to.not.be.Just;
    expect([]).to.not.be.Just;
  });

  it('should check for a Just with value', () => {
    expect(Just(5)).to.be.Just(5);
    expect(Just(5)).to.not.be.Just('foo');
    expect('foo').to.not.be.Just('foo');
    expect(Maybe.fromNullable('foo')).to.be.Just('foo');
  });

});
