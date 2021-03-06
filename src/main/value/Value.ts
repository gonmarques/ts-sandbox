import deepEqual = require('deep-equal');
import {Option} from "../control/Option";
import {Some} from "../control/Option";
import {None} from "../control/Option";

export abstract class Value<T> implements Iterable<T> {

    exists(predicate: (element: T) => boolean): boolean {
        for (let v of this) {
            if(predicate(v)){
                return true;
            }
        }
        return false;
    }

    forAll(predicate: (element: T) => boolean): boolean {
        return !this.exists((x: T) => !predicate(x));
    }

    forEach(action: (element: T) => void): void {
        for (let v of this) {
            action(v);
        }
    }

    contains(element: T): boolean {
        return this.exists(e => deepEqual(e, element));
    }

    getOrElse(supplier: () => T): T;
    getOrElse(other: T): T;
    getOrElse(anyOther: any): T {
        return this.isEmpty() ?
                   anyOther instanceof Function ?
                       anyOther() :
                       anyOther :
                   this.get();
    }

    getOrElseThrow<E extends Error>(supplier: () => E): T {
        if(this.isEmpty()){
            throw supplier();
        }
        return this.get();
    }

    getOrNull(): T {
        return this.isEmpty() ? null : this.get();
    }

    getOption(): Option<T> {
        return this.isEmpty() ? None.none() : Some.of(this.get());
    }

    abstract get(): T;

    abstract isEmpty(): boolean;

    abstract isSingleValued(): boolean;

    abstract map<U>(mapper: (element: T) => U): Value<U>;

    abstract peek(action: (element: T) => void): Value<T>;

    abstract [Symbol.iterator](): Iterator<T>;
}
