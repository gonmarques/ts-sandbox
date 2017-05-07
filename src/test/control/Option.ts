import 'mocha';
import * as sinon from 'sinon';
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

  it('"get" in a Option with value retrieves the value', () => {
    const value: Option<String> = Option.of("value");
    expect(value.get()).to.equal("value");
  });

  it('"get" in a Option without value throws Error', () => {
    const value: Option<String> = Option.of(null);
    const test = () => value.get();
    expect(test).to.throw(Error, "No value present");
  });

  it('"some" builds a Some instance', () => {
    const value: Option<String> = Option.some("value");
    expect(value instanceof Some).to.equal(true);
  });

  it('"some" builds a Option instance with a given value', () => {
    const value: Option<String> = Option.some("value");
    expect(value.get()).to.equal("value");
  });

  it('"none" builds a None instance', () => {
    const value: Option<String> = Option.none();
    expect(value instanceof None).to.equal(true);
  });

  it('"none" builds a Option instance that throws Error when value is fetched', () => {
    const value: Option<String> = Option.none();
    const test = () => value.get();
    expect(test).to.throw(Error, "No value present");
  });

  it('if value is present then is not empty', () => {
    const value: Option<String> = Option.of("value");
    expect(value.isEmpty()).to.equal(false);
  });

  it('if value is not present then is empty', () => {
    const value: Option<String> = Option.of(null);
    expect(value.isEmpty()).to.equal(true);
  });

  it('if value is present then is defined', () => {
    const value: Option<String> = Option.of("value");
    expect(value.isDefined()).to.equal(true);
  });

  it('if value is not present then is not defined', () => {
    const value: Option<String> = Option.of(null);
    expect(value.isDefined()).to.equal(false);
  });

  it('is not single valued', () => {
    const value: Option<String> = Option.of("value");
    expect(value.isSingleValued()).to.equal(false);
  });

  it('maps an Option with value', () => {
    const value: Option<String> = Option.of("value");
    expect(value.map((s: String) => s.length).get()).to.equal(5);
  });

  it('maps an Option without value', () => {
    const value: Option<String> = Option.of(null);
    expect(value.map((s: String) => s.length).isEmpty()).to.equal(true);
  });

  it('peeks an Option with value', () => {
    const value: Option<String> = Option.of("value");
    const action = sinon.spy();
    const other: Option<String> = value.peek(action);
    expect(action.calledOnce).to.equal(true);
    expect(action.calledWith("value")).to.equal(true);
    expect(value.get()).to.equal(other.get());
  });

  it('peeks an Option without value', () => {
    const value: Option<String> = Option.of(null);
    const action = sinon.spy();
    const other: Option<String> = value.peek(action);
    expect(action.called).to.equal(false);
    expect(other.isEmpty()).to.equal(true);
  });

  it('"when" creates Option which value is from supplier if condition is true', () => {
    const value: Option<String> = Option.when(true, () => "value");
    expect(value.get()).to.equal("value");
  });

  it('"when" creates empty Option if condition is false - supplier flavour', () => {
    const value: Option<String> = Option.when(false, () => "value");
    expect(value.isEmpty()).to.equal(true);
  });

  it('"when" creates Option which value is passed if condition is true', () => {
    const value: Option<String> = Option.when(true, "value");
    expect(value.get()).to.equal("value");
  });

  it('"when" creates empty Option if condition is false - passed value flavour', () => {
    const value: Option<String> = Option.when(false, "value");
    expect(value.isEmpty()).to.equal(true);
  });

  it('onEmpty calls action on empty Option', () => {
    const value: Option<String> = Option.of(null);
    const action = sinon.spy();
    const other: Option<String> = value.onEmpty(action);
    expect(action.calledOnce).to.equal(true);
    expect(other.isEmpty()).to.equal(true);
  });

  it('onEmpty doesnt call action on non empty Option', () => {
    const value: Option<String> = Option.of("value");
    const action = sinon.spy();
    const other: Option<String> = value.onEmpty(action);
    expect(action.called).to.equal(false);
    expect(value.get()).to.equal(other.get());
  });

  it('getOption returns Option', () => {
    const value: Option<String> = Option.of("value");
    const result: Option<String> = value.getOption();
    expect(result.get()).to.equal(value.get());
  });

  it('"flatMap" flattens Option if value is present', () => {
    const value: Option<String> = Option.of("value");
    const result: Option<String> = value.flatMap((v) => Some.some(v));
    expect(value.get()).to.equal(result.get());
  });

  it('"flatMap" returns empty Option if value is not present', () => {
    const value: Option<String> = Option.of(null);
    const result: Option<String> = value.flatMap((v) => Some.some(v));
    expect(result.isEmpty()).to.equal(true);
  });

  it('orElse with alternative value returns Option with alternative value if Option is empty', () => {
    const value: Option<String> = Option.of(null);
    const result: Option<String> = value.orElse(Option.of("other"));
    expect(result.get()).to.equal("other");
  });

  it('orElse with alternative value returns current Option if Option is not empty', () => {
    const value: Option<String> = Option.of("value");
    const result: Option<String> = value.orElse(Option.of("other"));
    expect(result.get()).to.equal("value");
  });

  it('orElse with alternative supplier returns Option with alternative sulier value if Option is empty', () => {
    const value: Option<String> = Option.of(null);
    const result: Option<String> = value.orElse(() => Option.of("other"));
    expect(result.get()).to.equal("other");
  });

  it('orElse with alternative supplier returns current Option if Option is not empty', () => {
    const value: Option<String> = Option.of("value");
    const result: Option<String> = value.orElse(() => Option.of("other"));
    expect(result.get()).to.equal("value");
  });

  it('iterator of non-empty Option iterates over the Option value', () => {
    let count = 0;
    let value: String = "";
    const option: Option<String> = Option.of("value");
    for (let v of option) {
        count++;
        value = v;
    }
    expect(count).to.equal(1);
    expect(value).to.equal("value");
  });

  it('iterator of empty Option iterates over an empty iterator', () => {
    let count = 0;
    let value: String = "";
    const option: Option<String> = Option.of(null);
    for (let v of option) {
        count++;
        value = v;
    }
    expect(count).to.equal(0);
    expect(value).to.equal("");
  });

});

describe('Some', () => {

  it('"of" builds a Some instance', () => {
    const value: Option<String> = Some.of("value");
    expect(value instanceof Some).to.equal(true);
  });

  it('"get" retrieves the value', () => {
    const value: Option<String> = Some.of("value");
    expect(value.get()).to.equal("value");
  });

  it('is not empty', () => {
    const value: Option<String> = Some.of("value");
    expect(value.isEmpty()).to.equal(false);
  });

});

describe('None', () => {

  it('"none" builds a None instance', () => {
    const value: Option<String> = None.none();
    expect(value instanceof None).to.equal(true);
  });

  it('"get" throws Error', () => {
    const value: Option<String> = None.none();
    const test = () => value.get();
    expect(test).to.throw(Error, "No value present");
  });

  it('is empty', () => {
    const value: Option<String> = None.none();
    expect(value.isEmpty()).to.equal(true);
  });

});
