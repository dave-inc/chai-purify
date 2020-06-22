import { Assertion } from 'chai';
import { Just, Maybe, Nothing } from 'purify-ts/Maybe';

declare global {
  export namespace Chai {
    interface Assertion {
      Maybe: Assertion;
      Nothing: Assertion;
      Just(value?: any): Assertion;
    }
  }
}

function isMaybe(obj: any): obj is Maybe<unknown> {
  return obj?.constructor === Maybe;
}

Assertion.addProperty('Maybe', function() {
  this.assert(
    isMaybe(this._obj),
    `expected #{this} to be a Maybe`,
    `expected #{this} to not be a Maybe`,
    Maybe,
  );
});

Assertion.addProperty('Nothing', function() {
  this.assert(
    this._obj === Nothing,
    `expected #{this} to be Nothing`,
    `expected #{this} to not be Nothing`,
    Nothing,
    this._obj,
    true
  );
});

Assertion.addMethod('Just', function(value?: any) {
  const obj = this._obj;
  if (arguments.length === 0) {
    this.assert(
      isMaybe(obj) && obj.isJust(),
      `expected #{this} to be a Just`,
      `expected #{this} to not be a Just`,
      Just(value),
    );
  } else {
    this.assert(
      Just(value).equals(obj),
      `expected #{this} to be ${Just(value)}`,
      `expected #{this} to not be ${Just(value)}`,
      Just(value),
    );
  }
});
