import 'mocha';
import {expect} from "chai";
import {Value} from "../../main/value/Value"

describe('Value', () => {

  it('checks that if an element matches a given predicate "exists" returns true', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.exists(p => p.name == "John")).to.equal(true);
  });

  it('checks that if no element matches a given predicate "exists" returns false', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.exists(p => p.name == "Peter")).to.equal(false);
  });

  it('checks if a value is contained', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.contains(new Person("John"))).to.equal(true);
  });

  it('checks if a value is not contained', () => {
    const value: Value<Person> = createValue(new Person("John"));
    expect(value.contains(new Person("Peter"))).to.equal(false);
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
