"use strict";
/* USAGE: here we define enumerations, interfaces and global constants */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = exports.Input = exports.QUANT = exports.PRICE = void 0;
/* the order book type you want to specify */
var OrderType;
(function (OrderType) {
    OrderType[OrderType["buy"] = 0] = "buy";
    OrderType[OrderType["sell"] = 1] = "sell";
})(OrderType || (OrderType = {}));
exports.OrderType = OrderType;
/* Question determination for the BinanceExchange  menu  */
var Input;
(function (Input) {
    Input[Input["quantity"] = 1] = "quantity";
    Input[Input["exit"] = 2] = "exit";
    Input[Input["mainMenu"] = 3] = "mainMenu";
    Input[Input["orderInterest"] = 4] = "orderInterest";
    Input[Input["resetTradePair"] = 5] = "resetTradePair"; /*future implementation */
})(Input || (Input = {}));
exports.Input = Input;
/*export functions down below*/
exports.PRICE = 0;
exports.QUANT = 1;
//# sourceMappingURL=helperTypes.js.map