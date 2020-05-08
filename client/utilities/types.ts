export type KeysOfType<T, U> = { [k in keyof T]: T[k] extends U ? k : never }[keyof T];

export interface ClassType<T = any> {
  new (...args: any[]): T;
}

export declare type Maybe<T> = T | null | undefined;

export declare type MaybePromise<T> = Promise<T> | T;

export type Optional<T> = { [P in keyof T]?: T[P] };

export type KeysOfString<T> = { [key: string]: T };
