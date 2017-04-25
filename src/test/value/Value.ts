import 'mocha';
import {expect} from "chai";
import {Value} from "../../main/value/Value"

describe('Value', () => {

  it('narrows the value', () => {
    const valueStr: Value<String> = createValue("value");
    const valueAny: Value<any> = Value.narrow(valueStr);
    expect(valueAny.get()).to.equal(valueStr.get());
  });

  it('checks that if an element matches a given predicate "exists" returns true', () => {
    const value: Value<String> = createValue("value");
    expect(value.exists((s: String) => s == "value")).to.equal(true);
  });

  it('checks that if no element matches a given predicate "exists" returns false', () => {
    const value: Value<String> = createValue("value");
    expect(value.exists((s: String) => s == "other")).to.equal(false);
  });

});

function createValue(value:String): Value<any> {
    let TestValue: {new(): Value<String>} = class extends Value<String> {
        get(): String {
            return value;
        }
        [Symbol.iterator](): Iterator<String> {
            let consumed: number = 0;
            return {
                next(): IteratorResult<String> {
                    return {
                        done: !!consumed++,
                        value
                    };
                }
            };
        }
    };
    return new TestValue();
}
