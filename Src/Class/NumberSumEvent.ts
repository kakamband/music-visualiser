import { EventEmitter } from 'events';

export interface Quotient {
  numerator: bigint;
  denominator: bigint;
}

/**
 * @name NumberSumEvent
 * @class
 * @extends EventEmitter
 * @description  a custom EventEmitter class that will be used to experiment with the EventEmitter and to make custom events.
 */
export class NumberSumEvent extends EventEmitter {
  /* data members */
  private mQuotient: Quotient;

  public constructor(quotient: Quotient) {
    super();
    this.mQuotient = quotient;
  }

  /* getters */
  public /*get*/ getNumerator(): bigint {
    return this.mQuotient.numerator;
  }
  public getDenominator(): bigint {
    return this.mQuotient.denominator;
  }

  /* setters */
  public /*set*/ setNumerator(numerator: bigint) {
    this.mQuotient.numerator = numerator;
  }
  public setDenominator(denominator: bigint) {
    denominator !== 0n ? (this.mQuotient.denominator = denominator) : undefined;
  }
  public setQuotient(quotient: Quotient) {
    this.mQuotient = quotient;
  }

  public remainderCalculation(): bigint {
    return this.mQuotient.numerator % this.mQuotient.denominator;
  }
}
