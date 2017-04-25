export abstract class Value<T> implements Iterable<T> {

    static narrow<T, TT extends T>(value: Value<TT>): Value<T> {
        return value;
    }

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
