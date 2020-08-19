"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSumEvent = void 0;
const events_1 = require("events");
/**
 * @name NumberSumEvent
 * @class
 * @extends EventEmitter
 * @description  a custom EventEmitter class that will be used to experiment with the EventEmitter and to make custom events.
 */
class NumberSumEvent extends events_1.EventEmitter {
    constructor(quotient) {
        super();
        this.mQuotient = quotient;
    }
    /* getters */
    getNumerator() {
        return this.mQuotient.numerator;
    }
    getDenominator() {
        return this.mQuotient.denominator;
    }
    /* setters */
    setNumerator(numerator) {
        this.mQuotient.numerator = numerator;
    }
    setDenominator(denominator) {
        (denominator !== 0n) ? this.mQuotient.denominator = denominator : undefined;
    }
    setQuotient(quotient) {
        this.mQuotient = quotient;
    }
    remainderCalculation() {
        return this.mQuotient.numerator % this.mQuotient.denominator;
    }
}
exports.NumberSumEvent = NumberSumEvent;
;
//# sourceMappingURL=NumberSumEvent.js.map