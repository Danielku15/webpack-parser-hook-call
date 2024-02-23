import { WorkingClass } from './other.mjs'
class NotWorkingClass {
    constructor(value) {
        this.value = value;
    }
}
const instance = new WorkingClass("Test");
console.log(instance.value);
const instance2 = new NotWorkingClass("Test");
console.log(instance2.value);
const array = new Uint8Array(1);
console.log(array);