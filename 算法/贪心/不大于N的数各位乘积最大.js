
function fn(n){
    if(n == 0) return 1;
    if(n<10)return n;
    return max(fn(n / 10) * (n % 10), fn(n / 10 - 1) * 9);
}