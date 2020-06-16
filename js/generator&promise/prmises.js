　functiontraverseDOM(element,callback){

element = element.firstElementChild;
while (element) {
    traverseDOM(element, callback);
    element = element.nextElementSibling;
}
}
constsubTree = document.getElementById("subTree");
traverseDOM(subTree, function (element) {
    assert(element !== null, element.nodeName);
});