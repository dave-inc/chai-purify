import { Assertion } from 'chai';
import { Either, Left, Right } from 'purify-ts/Either'

declare global {
  export namespace Chai {
    interface Assertion {
      Either: Assertion;
      Left(value?: any): Assertion;
      Right(value?: any): Assertion
    }
  }
}

function isEither(obj: any): obj is Either<unknown, unknown> {
  return obj?.constructor === Either
}

Assertion.addProperty('Either', function() {
  this.assert(
    isEither(this._obj),
    `expected #{this} to be an Either`,
    `expected #{this} to not be an Either`,
    Either,
  );
});

Assertion.addMethod('Left', function(value?: any) {
  const obj = this._obj;
  if (arguments.length === 0) {
    this.assert(
      isEither(obj) && obj.isLeft(),
      `expected #{this} to be a Left`,
      `expected #{this} to not be a Left`,
      Left,
    );
  } else {
    this.assert(
      isEither(obj) && obj.either(
        (left: any) => left === value,
        (_: any) => false
      ),
      `expected ${obj} to be ${Left(value)}`,
      `expected ${obj} to not be ${Left(value)}`,
      Left,
    );
  }
});

Assertion.addMethod('Right', function(value?: any) {
  const obj = this._obj;
  if (arguments.length === 0) {
    this.assert(
      isEither(obj) && obj.isRight(),
      `expected #{this} to be a Right`,
      `expected #{this} to not be a Right`,
      Right,
    );
  } else {
    this.assert(
      isEither(obj) && obj.either(
        (_: any) => false,
        (right: any) => right === value,
      ),
      `expected ${obj} to be ${Right(value)}`,
      `expected ${obj} to not be ${Right(value)}`,
      Right,
    );
  }
});
