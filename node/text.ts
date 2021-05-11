import { resolve } from 'path';
function pathResolve(dir:string) {
    return resolve(process.cwd(), '.', dir);
}
console.log(pathResolve('ppp'))