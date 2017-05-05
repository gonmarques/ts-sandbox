import deepEqual = require('deep-equal');

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

    abstract get(): T;

    abstract isEmpty(): boolean;

    abstract [Symbol.iterator](): Iterator<T>;
}
