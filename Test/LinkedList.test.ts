// import orginalTestImport, { ExecutionContext, TestInterface } from 'ava';
// import RSA, {PrimePair} from '../../Src/Class/rsa'
import orginalTestImport, { ExecutionContext, TestInterface } from 'ava';
import { LinkedList } from '../Src/Class/LinkedList';


interface CustomInterface<Type>
{
  linkedList: LinkedList<Type>;
  data: Type [];
}

// const pqPairTest1: PrimePair = {
//   p: 1,
//   q: 2,
// };


/**
 * @description - Line below notes. Basically this <> means that the new type must have properties that are based on the type/class/interface specified inside it. For example
 *  
 * Assume that we have an inteface called:
 * interface TwoSum
 * {
 *  num1 :number;
 *  num2 :number;
 * };
 * 
 * And we have an interface with SomeINterface<Context = unknown>
 * So when we write 
 * <SomeInterface<Interface>>
 *  This is basically us using templates. 
 */


 /**
 * Setting up before tests
 */
const test: TestInterface<CustomInterface<bigint>> = orginalTestImport as TestInterface<CustomInterface<bigint>>;
test.before( (t: ExecutionContext<CustomInterface<bigint>>) =>
{
  t.context.linkedList = new LinkedList();
});

/**
 * Test 1
 */
test.beforeEach( (t: ExecutionContext<CustomInterface<bigint>>) =>
{
  t.context.data = [0n, 35n, 44n, 33n, 2n];
});
test("Does Linked list add correctly?", (t: ExecutionContext<CustomInterface<bigint>>) =>
{
    t.plan(1);  /* only plan to have one assertion */
    t.context.data.forEach((item: bigint) =>
        {
            t.context.linkedList.addToList(item);
        }
    );
    t.is(t.context.linkedList.elementCount, t.context.data.length);     /* Note the element count is accessed like it's a property (when it is in fact a function) */
});

// /**
//  * Test 1
//  */
// test.beforeEach( (t: ExecutionContext<CustomInterface>) =>
// {
//   t.context.msgStream2 = "Test 1 - Looking at the prime number values being correct";
// });
// test("Are p and q primes?", (t: ExecutionContext<CustomInterface>) =>
// {
//     t.plan(2); /* we plan to have only one assertion to happen here */
//     [pqPairTest1, pqPairTest2].forEach( //,pqPairTest4
//       (p: PrimePair) =>
//       {
//         t.notThrows(() => {new RSA(p, encryptTest);});
//         process.stderr.write(`${t.context.msgStream2}\t (${p.p},${p.q})\n`);
//       }
//     );
// });

// /**
//  * Test 2 - note looks to be not possible to test if a constructor throws in typescript. This doesn't seem to be the recommended practice in Typescript
//  */
// // test.beforeEach( (t: ExecutionContext<CustomInterface>) =>
// // {
// //   t.context.msgStream2 = "Test 2 - Looking at p and q being the same";
// // });
// // test("Are p and q duplicates?", (t: ExecutionContext<CustomInterface>) =>
// // {
// //    t.plan(2); /* we plan to have only one assertion to happen here */
// //     [pqPairTest3, pqPairTest4].forEach( //,pqPairTest4
// //       (p: PrimePair) =>
// //       {
// //         const res: Error = t.throws(() => 
// //         {
// //           throw new Error ('test');
// //           console.log(`Playing aroundkhjh\n`);
// //           try{
// //             new RSA(p, encryptTest);
// //           }catch (e)
// //           {
// //             console.log(`we got in the error part`);
// //             throw e;
// //           }
          
// //         }, { instanceOf: Error });
// //         process.stderr.write(`${t.context.msgStream2}\t (${p.p},${p.q})\n`);
// //       }
// //     );
// // });


// /**
//  * Test 3
//  */
// // test.beforeEach( (t: ExecutionContext<CustomInterface>) =>
// // {
// //   t.context.msgStream2 = "Test 3 - Looking at p and q being non primes";
// // });
// // test("Are p and q not primes?", (t: ExecutionContext<CustomInterface>) =>
// // {
// //     t.plan(3); /* we plan to have only one assertion to happen here */
// //     [pqPairTest5, pqPairTest6, pqPairTest7].forEach( //,pqPairTest4
// //       (p: PrimePair) =>
// //       {
// //         t.throws(() => {new RSA(p, encryptTest);},{instanceOf: Error});
// //         process.stderr.write(`${t.context.msgStream2}\t (${p.p},${p.q})\n`);
// //       }
// //     );
// // });



// /**
//  *  Test 4 - extended Eucldiean Algorithm
//  */

// test.beforeEach( (t: ExecutionContext<CustomInterface>) =>
// {
//   t.context.msgStream2 = "Test 4 - Looking at the correctness of the Ecucliean algorithm";
// });
// test("Testing extened eucliedean", (t: ExecutionContext<CustomInterface>) =>
// {
  
//     //t.plan(2); /* we plan to have only one assertion to happen here */
//     [{p: 47,q: 71}].forEach( //,pqPairTest4
//       (p: PrimePair) =>
//       {
//         let rsa: RSA;
//         t.notThrows(() => {
//           rsa = new RSA(p, 79);
//           t.is(rsa.getDecryptKey(), 1019);
//           process.stderr.write(`${t.context.msgStream2}\t (${p.p},${p.q})\n`);
//         });
//       }
//     );
// });