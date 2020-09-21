import OrderBook from './class/OrderBook';
import { yamlTest } from './yamlExample';
import { NumberSumEvent, Quotient } from './class/NumberSumEvent';
import { LinkedList } from './class/LinkedList';

// process.stdout.write(`Test\n`);
/* dotenv api allows you to refer to environment variables that you made */
const envConf = require('dotenv').config({ path: './Src/Env/default.env' });

// const orderBook :OrderBook = new OrderBook();

/* checking ava testing with a test file */

const bigIntSum = (num: bigint): bigint => {
    return BigInt(Number.MAX_SAFE_INTEGER) + num;
};

const normalSum = (num1: number, num2: number): number => {
    return num1 + num2;
};
// process.stdout.write(`${bigIntSum(0n)}`); /* 5n bigint literals is only possible if targeting ES2020 */

// yamlTest();

/* Event Emitter testing */

const myNumberEvent = new NumberSumEvent({
    numerator: BigInt(Number.MAX_SAFE_INTEGER),
    denominator: 10n
});

myNumberEvent.on(`modulo`, () => {
    process.stdout.write(
        `${myNumberEvent.getNumerator()} / ${myNumberEvent.getDenominator()} are divisible!\n`
    );
});

myNumberEvent.on(`intLimit`, () => {
    process.stdout.write(`Reached the integer limit! Resetting to 0 \n`);
    myNumberEvent.setNumerator(0n);
});

const testList: LinkedList<bigint> = new LinkedList<bigint>();

const startTime: Date = new Date();
const timerObj: ReturnType<typeof setInterval> = setInterval(() => {
    const timeNow: Date = new Date();
    const timeDifference: number = timeNow.getTime() - startTime.getTime();
    //process.stdout.write (`Time difference (ms) is: ${timeDifference}\n`);
    const currentNumerator = myNumberEvent.getNumerator();
    myNumberEvent.setNumerator(currentNumerator + 1n);
    const res: bigint = myNumberEvent.remainderCalculation();

    testList.addToList(res);

    if (res === 0n) {
        myNumberEvent.emit(`modulo`);
    }

    if (myNumberEvent.getNumerator() >= BigInt(Number.MAX_SAFE_INTEGER)) {
        myNumberEvent.emit(`intLimit`);
    }
}, 1000);

process.nextTick(() => {
    const timerObj: ReturnType<typeof setInterval> = setInterval(() => {
        process.stdout.write(`Process nextTick\n`);
        testList.printList();
    }, 1000);
});

/* setImmediate() - triggers just right of the start of the next tick */
/* process.nextTick() - triggers just at the end of the current tick */
/* In proper order, it should be process.nextTick() and then setImmediate() */

export { bigIntSum, normalSum };

/*
https://medium.com/free-code-camp/testing-your-nodejs-applications-with-ava-js-99e806a226a7
*/
