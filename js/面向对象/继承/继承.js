function pick(object) {
    let res = Object.create(null);
    for(var i =1, len = arguments.length; i < len; i++){
        res[arguments[i]] = object[arguments[i]]
    }
    return res;
}
let book = {
    title: 'ddd',
    author: 'dsdada',
    year: 2021
};
let bookData = pick(book,"author","year")
