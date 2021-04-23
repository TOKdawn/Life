function identity<T>(arg: T): T {
    return arg;
}
function create<T>(c: {new(): T; }): T {
    return new c();
}