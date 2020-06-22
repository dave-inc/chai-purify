# Chai Plugin for Purify

Chai assert helpers for [Purify-TS](https://gigobyte.github.io/purify/) ADTs

## Install

```
$ npm install --save-dev chai-purify
```

## Helpers

### Maybe

```typescript
    expect(Nothing).to.be.Maybe;
    expect(Nothing).to.be.Nothing;
    expect(Nothing).to.not.be.Just();

    expect(Just(5)).to.be.Maybe;
    expect(Just(5)).to.be.Just();
    expect(Just(5)).to.be.Just(5);
    expect(Just(5)).to.not.be.Just(10);
    expect(Just(5)).to.not.be.Nothing;
    expect(5).to.not.be.Just(5);
```

### Either

```typescript
    expect(Left('foo')).to.be.Either;
    expect(Left('foo')).to.be.Left();
    expect(Left('foo')).to.be.Left('foo');
    expect('foo').to.be.Left('foo');
    expect(Left('foo')).to.not.be.Right();


    expect(Right(5)).to.be.Either;
    expect(Right(5)).to.be.Right();
    expect(Right(5)).to.be.Right(5);
    expect(5).to.not.be.Right(5);
    expect(Right(5)).to.not.be.Left();
```
