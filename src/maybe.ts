import { Assertion, util } from 'chai';
import { Just, Maybe, Nothing } from 'purify-ts/Maybe';

declare global {
  export namespace Chai {
    interface Assertion {
      Just<T>(value?: T): Assertion;
      Nothing: Assertion;
    }
  }
}

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

Assertion.addMethod('Just', function<T>(value?: T) {
  const obj = this._obj;
  if (arguments.length === 0) {
    this.assert(
      obj.constructor === Maybe && obj.isJust(),
      `expected #{this} to be a Just`,
      `expected #{this} to not be a Just`,
      Just(value),
    );
  } else {
    this.assert(
      Just(value).equals(obj as Maybe<T>),
      `expected #{this} to be ${Just(value)}`,
      `expected #{this} to not be ${Just(value)}`,
      Just(value),
    );
  }
});
