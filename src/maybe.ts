import { Assertion, util } from 'chai';
import { Just, Maybe, Nothing } from 'purify-ts/Maybe';

declare global {
  export namespace Chai {
    interface Assertion {
      Just(value: any): Assertion;
      Nothing: Assertion;
    }
  }
}

Assertion.addProperty('Nothing', function() {
  const obj = util.flag(this, 'object');
  this.assert(
    obj === Nothing,
    `expected ${obj} to be Nothing`,
    `expected ${obj} to not be Nothing`,
    Nothing,
    obj,
    true
  );
});

Assertion.addChainableMethod('Just', function(value: any) {
  const obj = util.flag(this, 'object');
  this.assert(
    Just(value).equals(obj),
    `expected ${obj} to be ${Just(value)}`,
    `expected ${obj} to not be ${Just(value)}`,
    Just(value),
    obj,
    true
  );
}, function () {
  const obj = util.flag(this, 'object');
  this.assert(
    obj?.constructor === Maybe && (obj as Maybe<unknown>).isJust(),
    `expected ${obj} to be a Just`,
    `expected ${obj} to not be a Just}`,
    Just,
    obj,
    true
  );
});
