import 'mocha';
import {expect} from "chai";
import {Option} from "../../main/control/Option"
import {Some} from "../../main/control/Option"
import {None} from "../../main/control/Option"

describe('Option', () => {

  it('"of" with value builds a Some instance', () => {
    const value: Option<String> = Option.of("value");
    expect(value instanceof Some).to.equal(true);
  });

  it('"of" without value builds a None instance', () => {
    const value: Option<String> = Option.of(null);
    expect(value instanceof None).to.equal(true);
  });

});

describe('Some', () => {

  it('"of" builds a Some instance', () => {
    const value: Option<String> = Some.of("value");
    expect(value instanceof Some).to.equal(true);
  });

});

describe('None', () => {

  it('"none" builds a None instance', () => {
    const value: Option<String> = None.none();
    expect(value instanceof None).to.equal(true);
  });

});
