import OrderBook from "./Class/OrderBook";
import test from 'ava'; /* test units */

//process.stdout.write(`Test\n`);
const envConf = require('dotenv').config({ path: './Src/Env/default.env' });

// const orderBook :OrderBook = new OrderBook();


/* checking ava testing with a test file */

const bigIntSum  = (num: bigint) : bigint =>  {
    return BigInt(Number.MAX_SAFE_INTEGER) + num;
};

const normalSum = (num1: number, num2: number): number => {
    return (num1 + num2);
};
//process.stdout.write(`${bigIntSum(0n)}`); /* 5n bigint literals is only possible if targeting ES2020 */



export {bigIntSum, normalSum} ;

/* 
https://medium.com/free-code-camp/testing-your-nodejs-applications-with-ava-js-99e806a226a7
*/
