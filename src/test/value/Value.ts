import 'mocha';
import * as sinon from 'sinon';
import {expect} from "chai";
import {Value} from "../../main/value/Value"

describe('Value', () => {

  it('if an element matches a given predicate "exists" returns true', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.exists(p => p.name == "John")).to.equal(true);
  });

  it('if no element matches a given predicate "exists" returns false', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.exists(p => p.name == "Peter")).to.equal(false);
  });

  it('if all elements match a given predicate "forAll" returns true', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.forAll(p => p.name == "John")).to.equal(true);
  });

  it('if at least an element does not match a given predicate "forAll" returns false', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.forAll(p => p.name == "Peter")).to.equal(false);
  });

  it('a value is contained', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.contains(new Person("John"))).to.equal(true);
  });

  it('a value is not contained', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.contains(new Person("Peter"))).to.equal(false);
  });

  it('executes "forEach"', () => {
    const value: Value<Person> = createValue(new Person("John"));
    const action = sinon.spy();
    value.forEach(action);
    expect(action.calledOnce).to.equal(true);
    expect(action.calledWith(value.get())).to.equal(true);
  });

});

function createValue(value: Person): Value<Person> {
    let TestValue: {new(): Value<Person>} = class extends Value<Person> {
        get(): Person {
            return value;
        }
        [Symbol.iterator](): Iterator<Person> {
            let consumed: number = 0;
            return {
                next(): IteratorResult<Person> {
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

class Person {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
}
