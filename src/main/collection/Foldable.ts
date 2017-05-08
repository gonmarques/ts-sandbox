import {Option} from "../control/Option"

export abstract class Foldable<T> {

    fold(zero: T, combine: (t1: T, t2: T) => T): T {
        return this.foldLeft(zero, combine);
    }

    reduce(op: (t1: T, t2: T) => T): T {
        return this.reduceLeft(op);
    }

    reduceOption(op: (t1: T, t2: T) => T): Option<T> {
        return this.reduceLeftOption(op);
    }

    abstract foldLeft<U>(zero: U, combine: (u: U, t: T) => U): U;

    abstract foldRight<U>(zero: U, combine: (t: T, u: U) => U): U;

    abstract reduceLeft(op: (t1: T, t2: T) => T): T;

    abstract reduceLeftOption(op: (t1: T, t2: T) => T): Option<T>;

    abstract reduceRight(op: (t1: T, t2: T) => T): T;

    abstract reduceRightOption(op: (t1: T, t2: T) => T): Option<T>;
}
