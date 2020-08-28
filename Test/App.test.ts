import test from 'ava';
//import {bigIntSum} from '@Src/App'
import {bigIntSum, normalSum} from '../Src/App'

/* ava testing is essentially like model checking or an abstracted version of formal software engineering */

test('Test1: check if bitIntSum gives exepected output of the bigIntSum', t => {
  t.plan(2);
  t.pass('(Test1: passed)');
  t.is(bigIntSum(0n), BigInt(Number.MAX_SAFE_INTEGER));
  
});

test('Test2: check if normal sum works', t => {
  t.plan(2);
  t.is(normalSum(1, 2), 3);
  t.pass('(Test2: passed)');
});


/*
  Note that putting t.fail() within the tests seem to automically fail the tests, even though if they are correct 
  Just don't put it in for now
*/