"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
//import {bigIntSum} from '@Src/App'
const App_1 = require("../Src/App");
ava_1.default('Test1: check if bitIntSum gives exepected output of the bigIntSum', t => {
    t.plan(1);
    t.pass('(Test1: passed)');
    t.is(App_1.bigIntSum(4n), BigInt(Number.MAX_SAFE_INTEGER));
});
ava_1.default('Test2: check if normal sum works', t => {
    t.plan(2);
    t.is(App_1.normalSum(1, 2), 24);
    t.pass('(Test2: passed)');
});
//process.stdout.write(`${bigIntSum(0n)}`); /* 5n bigint literals is only possible if targeting ES2020 */
//# sourceMappingURL=App.test.js.map