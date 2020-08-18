"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalSum = exports.bigIntSum = void 0;
//process.stdout.write(`Test\n`);
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
/*
https://medium.com/free-code-camp/testing-your-nodejs-applications-with-ava-js-99e806a226a7
*/
//# sourceMappingURL=App.js.map