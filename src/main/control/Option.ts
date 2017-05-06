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

    [Symbol.iterator](): Iterator<T> {
        throw new Error('Method not implemented.');
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

    [Symbol.iterator](): Iterator<T> {
        throw new Error('Method not implemented.');
    }
}
