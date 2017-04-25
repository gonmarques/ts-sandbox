import 'mocha';
import {expect} from "chai";
import {Value} from "../../main/value/Value"

describe('Value', () => {

  it('narrows the value', () => {
    const valueStr: Value<String> = createValue("value");
    const valueAny: Value<any> = Value.narrow(valueStr);
    expect(valueAny.get()).to.equal(valueStr.get());
  });

});

function createValue(value:String): Value<any> {
    return {
        get: () => value,
        [Symbol.iterator]: () => null
    };
}
