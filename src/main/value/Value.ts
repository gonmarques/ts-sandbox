export abstract class Value<T> implements Iterable<T> {

    exists(predicate: (T) => boolean): boolean {
        for (let v of this) {
            if(predicate(v)){
                return true;
            }
        }
        return false;
    }

    abstract get(): T;

    abstract [Symbol.iterator](): Iterator<T>;
}
