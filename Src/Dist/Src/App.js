"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalSum = exports.bigIntSum = void 0;
const NumberSumEvent_1 = require("./Class/NumberSumEvent");
const LinkedList_1 = require("./Class/LinkedList");
// process.stdout.write(`Test\n`);
/* dotenv api allows you to refer to environment variables that you made */
const envConf = require('dotenv').config({ path: './Src/Env/default.env' });
// const orderBook :OrderBook = new OrderBook();
/* checking ava testing with a test file */
const bigIntSum = (num) => {
    return BigInt(Number.MAX_SAFE_INTEGER) + num;
};
exports.bigIntSum = bigIntSum;
const normalSum = (num1, num2) => {
    return (num1 + num2);
};
exports.normalSum = normalSum;
// process.stdout.write(`${bigIntSum(0n)}`); /* 5n bigint literals is only possible if targeting ES2020 */
// yamlTest();
/* Event Emitter testing */
let myNumberEvent = new NumberSumEvent_1.NumberSumEvent({ numerator: BigInt(Number.MAX_SAFE_INTEGER), denominator: 10n });
myNumberEvent.on(`modulo`, () => {
    process.stdout.write(`${myNumberEvent.getNumerator()} / ${myNumberEvent.getDenominator()} are divisible!\n`);
});
myNumberEvent.on(`intLimit`, () => {
    process.stdout.write(`Reached the integer limit! Resetting to 0 \n`);
    myNumberEvent.setNumerator(0n);
});
const testList = new LinkedList_1.LinkedList();
const startTime = new Date();
const timerObj = setInterval(() => {
    const timeNow = new Date();
    let timeDifference = timeNow.getTime() - startTime.getTime();
    //process.stdout.write (`Time difference (ms) is: ${timeDifference}\n`);
    let currentNumerator = myNumberEvent.getNumerator();
    myNumberEvent.setNumerator(currentNumerator + 1n);
    let res = myNumberEvent.remainderCalculation();
    testList.addToList(res);
    if (res === 0n) {
        myNumberEvent.emit(`modulo`);
    }
    if (myNumberEvent.getNumerator() >= BigInt(Number.MAX_SAFE_INTEGER)) {
        myNumberEvent.emit(`intLimit`);
    }
}, 1000);
process.nextTick(() => {
    const timerObj = setInterval(() => {
        process.stdout.write(`Process nextTick\n`);
        testList.printList();
    }, 1000);
});
/*
https://medium.com/free-code-camp/testing-your-nodejs-applications-with-ava-js-99e806a226a7
*/
//# sourceMappingURL=App.js.map