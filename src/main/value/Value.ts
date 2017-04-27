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

    contains(element: T): boolean {
        return this.exists(e => deepEqual(e, element));
    }

    abstract get(): T;

    abstract [Symbol.iterator](): Iterator<T>;
}
