export abstract class Value<T> implements Iterable<T> {

    static narrow<T, TT extends T>(value: Value<TT>): Value<T> {
        return value;
    }

    abstract get(): T;

    abstract [Symbol.iterator](): Iterator<T>;
}
