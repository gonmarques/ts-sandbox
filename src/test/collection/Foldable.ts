import 'mocha';
import * as sinon from 'sinon';
import {expect} from "chai";
import {Foldable} from "../../main/collection/Foldable"
import {Option} from "../../main/control/Option"

describe('Foldable', () => {

  it('fold', () => {
    const foldable: Foldable<string> = createFoldable();
    const result: string  = foldable.fold("a", (s1, s2) => s1.concat(s2));
    expect(result).to.equal("asomething");
  });

  it('reduce', () => {
    const foldable: Foldable<string> = createFoldable();
    const result: string = foldable.reduce((s1, s2) => s1.concat(s2));
    expect(result).to.equal("onetwo");
  });
  
  it('reduceOption', () => {
    const foldable: Foldable<string> = createFoldable();
    const result: Option<string> = foldable.reduceOption((s1, s2) => s1.concat(s2));
    expect(result.get()).to.equal("onetwo");
  });

});

function createFoldable(): Foldable<string> {
    let TestFoldable: { new (): Foldable<string> } = class extends Foldable<string> {

        foldLeft<U>(zero: U, combine: (u: U, t: string) => U): U {
          return combine(zero, "something");
        }

        foldRight<U>(zero: U, combine: (t: string, u: U) => U): U {
          throw new Error('Method not implemented.');
        }

        reduceLeft(op: (t1: string, t2: string) => string): string {
          return op("one", "two");
        }

        reduceLeftOption(op: (t1: string, t2: string) => string): Option<string> {
          return Option.some(op("one", "two"));
        }

        reduceRight(op: (t1: string, t2: string) => string): string {
          throw new Error('Method not implemented.');
        }

        reduceRightOption(op: (t1: string, t2: string) => string): Option<string> {
          throw new Error('Method not implemented.');
        }
    };
    return new TestFoldable();
}
