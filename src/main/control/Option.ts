import {Value} from "../value/Value"

export abstract class Option<T> extends Value<T> {

    static of<T>(value: T): Option<T> {
        return value == null ? None.none() : Some.of(value);
    }

    static some<T>(value: T): Option<T> {
        return Some.of(value);
    }

    static none(): Option<any> {
        return None.none();
    }

    static when<T>(condition: boolean, supplier: () => T): Option<T>;
    static when<T>(condition: boolean, supplier: T): Option<T>;
    static when<T>(condition: boolean, supplier: any): Option<T> {
        return condition ?
                   Some.of(
                       supplier instanceof Function ?
                           supplier() :
                           supplier
                   ) :
                   None.none();
    }

    isSingleValued(): boolean {
        return false;
    }

    map<U>(mapper: (element: T) => U): Option<U> {
        return this.isEmpty() ? None.none() : Some.of(mapper(this.get()));
    }

    flatMap<U>(mapper: (element: T) => Option<U>): Option<U> {
        return this.isEmpty() ? None.none() : mapper(this.get());
    }

    peek(action: (element: T) => void): Option<T> {
        if(this.isDefined()) {
            action(this.get());
        }
        return this;
    }

    onEmpty(action: () => void): Option<T> {
        if(this.isEmpty()) {
            action();
        }
        return this;
    }

    isDefined(): boolean {
        return !this.isEmpty();
    }

    getOption(): Option<T> {
        return this;
    }

    filter(predicate: (element: T) => boolean): Option<T> {
        return this.isEmpty() || predicate(this.get()) ? this : None.none();
    }

    orElse(supplier: () => Option<T>): Option<T>;
    orElse(other: Option<T>): Option<T>;
    orElse(anyOther: any): Option<T> {
        return this.isEmpty() ?
                   anyOther instanceof Function ?
                       anyOther() :
                       anyOther :
                   this;
    }

    [Symbol.iterator](): Iterator<T> {
        const isDefined = () => this.isDefined();
        const get = () => this.get();
        let consumed: number = 0;
        return {
            next(): IteratorResult<T> {
                return {
                    done: isDefined() ? !!consumed++ : true,
                    value: isDefined() ? get() : null
                };
            }
        };
    }
}

export class Some<T> extends Option<T> {

    readonly value: T;
    
    private constructor(value: T) {
        super();
        this.value = value;
    }

    static of<T>(value: T): Option<T> {
        return new Some(value);
    }

    get(): T {
        return this.value;
    }

    isEmpty(): boolean {
        return false;
    }
}

export class None<T> extends Option<T> {

    private static readonly INSTANCE: None<any> = new None<any>();

    private constructor(){
        super();
    }

    static none(): Option<any> {
        return None.INSTANCE;
    }

    get(): T {
        throw new Error('No value present');
    }

    isEmpty(): boolean {
        return true;
    }
}
