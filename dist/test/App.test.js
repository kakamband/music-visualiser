"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
//import {bigIntSum} from '@Src/App'
const App_1 = require("../App");
/* ava testing is essentially like model checking or an abstracted version of formal software engineering */
ava_1.default('Test1: check if bitIntSum gives exepected output of the bigIntSum', t => {
    t.plan(2);
    t.pass('(Test1: passed)');
    t.is(App_1.bigIntSum(0n), BigInt(Number.MAX_SAFE_INTEGER));
});
ava_1.default('Test2: check if normal sum works', t => {
    t.plan(2);
    t.is(App_1.normalSum(1, 2), 3);
    t.pass('(Test2: passed)');
});
/*
  Note that putting t.fail() within the tests seem to automically fail the tests, even though if they are correct
  Just don't put it in for now
*/ 
//# sourceMappingURL=App.test.js.map