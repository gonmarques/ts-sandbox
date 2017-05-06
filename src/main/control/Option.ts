import {Value} from "../value/Value"

export abstract class Option<T> extends Value<T> {

    static of<T>(value: T): Option<T> {
        return value == null ? None.none() : Some.of(value);
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
        throw new Error('Method not implemented.');
    }
    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }
    isSingleValued(): boolean {
        throw new Error('Method not implemented.');
    }
    map<U>(mapper: (element: T) => U): Value<U> {
        throw new Error('Method not implemented.');
    }
    peek(action: (element: T) => void): Value<T> {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): Iterator<T> {
        throw new Error('Method not implemented.');
    }
}

export class None<T> extends Option<T> {

    private static INSTANCE: None<any> = new None<any>();

    private constructor(){
        super();
    }

    static none(): Option<any> {
        return None.INSTANCE;
    }

    get(): T {
        throw new Error('Method not implemented.');
    }
    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }
    isSingleValued(): boolean {
        throw new Error('Method not implemented.');
    }
    map<U>(mapper: (element: T) => U): Value<U> {
        throw new Error('Method not implemented.');
    }
    peek(action: (element: T) => void): Value<T> {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): Iterator<T> {
        throw new Error('Method not implemented.');
    }
}
