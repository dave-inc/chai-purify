import 'mocha';
import { expect } from 'chai';
import '../src/either';
import { Either, Left, Right } from 'purify-ts/Either';

describe('Either', () => {

  it('should check for an Either', () => {
    expect(Left('foo')).to.be.Either;
    expect(Right(10)).to.be.Either;
    expect(Either.of([])).to.be.Either;
    expect(Either.encase(() => { throw 'error' })).to.be.Either;
  });

  it('should check for not an Either', () => {
    expect('foo').to.not.be.Either;
    expect(10).to.not.be.Either;
  });

  it('should check for Left', () => {
    expect(Left('foo')).to.be.Left;
    expect(Either.encase(() => { throw 'error' })).to.be.Left;
  });

  it('should check for not Left', () => {
    expect(Right(100)).to.not.be.Left;
    expect(Either.encase(() => true)).to.not.be.Left;
    expect(null).to.not.be.Left;
  });

  it('should check for a Left with value', () => {
    expect(Left('foo')).to.be.Left('foo');
    expect(Either.encase(() => { throw 'bad thing' })).to.be.Left('bad thing');
    expect(Left('bar')).to.not.be.Left('foo');
    expect(Right('foo')).to.not.be.Left('foo');
    expect('foo').to.not.be.Left('foo');
  });

  it('should check for Right', () => {
    expect(Right(19)).to.be.Right;
    expect(Either.encase(() => true)).to.be.Right;
  });

  it('should check for not Right', () => {
    expect(Left('foo')).to.not.be.Right;
    expect(Either.encase(() => { throw 'bad thing' })).to.not.be.Right;
    expect(true).to.not.be.Right;
  });

  it('should check for a Right with value', () => {
    expect(Right(10)).to.be.Right(10);
    expect(Either.encase(() => true)).to.be.Right(true);
    expect(true).to.not.be.Right(true);
    expect(Right(99)).to.not.be.Right(100);
    expect(Left('foo')).to.not.be.Right('foo');
  });
});
