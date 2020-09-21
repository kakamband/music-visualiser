"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* USAGE: local order book */
const axios_1 = require("axios");
const helperTypes_1 = require("./helperTypes");
class OrderBook {
    /* constructor */
    constructor(depth = 1000, tPair = { base: 'BTC', quote: 'USDT' }) {
        /* private members */
        this.buyers = [];
        this.sellers = [];
        this.lastUpdateId = -1;
        tPair = { base: tPair.base.trim(), quote: tPair.quote.trim() };
        const snapshotURL = `https://www.binance.com/api/v1/depth?symbol=${tPair.base + tPair.quote}&limit=${depth.toString()}`;
        axios_1.default
            .get(snapshotURL) /* gets snapshot data */
            .then(this.parseBinanceOrderBookSnapshot.bind(this))
            .catch((error) => {
            process.stderr.write(`error in retrieving orderbook snapshot from binance: ${error.response.data.msg}\n`);
            process.stderr.write(`Exiting program`);
            process.exit();
        });
    }
    /* getters and setters */
    get LastUpdateId() {
        return this.lastUpdateId;
    }
    set LastUpdateId(id) {
        this.lastUpdateId = id;
    }
    /* user functions */
    updateOrderBook(type, target) {
        /* updation through binary search */
        const prices = type === helperTypes_1.OrderType.buy ? this.buyers : this.sellers;
        const binIndex = this.binarySearch(type, 0, prices.length - 1, target[0], prices);
        /*determine whether to update, delete, insert entry or do nothing */
        if (prices.length !== OrderBook.EMPTY_BOOK) {
            /* if local order book is not empty */
            if (target[helperTypes_1.PRICE] === prices[binIndex][helperTypes_1.PRICE]) {
                /* if found */
                target[helperTypes_1.QUANT] === OrderBook.DELETE_ENTRY
                    ? prices.splice(binIndex, 1)
                    : (prices[binIndex][helperTypes_1.QUANT] =
                        target[helperTypes_1.QUANT]); /* if true delete, else update */
            }
            else if (target[helperTypes_1.QUANT] !== OrderBook.DELETE_ENTRY) {
                /* not found, insert */
                switch (type) {
                    case helperTypes_1.OrderType.buy /* highest price to lowest price - buyers */:
                        target[helperTypes_1.PRICE] > prices[binIndex][helperTypes_1.PRICE]
                            ? prices.splice(binIndex, 0, target)
                            : prices.splice(binIndex + 1, 0, target);
                        break;
                    case helperTypes_1.OrderType.sell:
                        target[helperTypes_1.PRICE] < prices[binIndex][helperTypes_1.PRICE]
                            ? prices.splice(binIndex, 0, target)
                            : prices.splice(binIndex + 1, 0, target);
                        break;
                }
            }
        }
        else {
            /* empty order book */
            if (target[helperTypes_1.QUANT] !== OrderBook.DELETE_ENTRY) {
                /* add to order book if not delete entry */
                prices.push(target);
            }
        }
    }
    /* private functions */
    parseBinanceOrderBookSnapshot(res) {
        this.lastUpdateId = res.data.lastUpdateId;
        for (let i = 0; i < res.data.bids.length; i++) {
            /*design choice to seperate buyers and sellers.
                                                            A possibility for initial snapshot to be of varying lengths of buyers and sellers (although low chance) */
            const newEntry = [
                parseFloat(res.data.bids[i][helperTypes_1.PRICE]),
                parseFloat(res.data.bids[i][helperTypes_1.QUANT])
            ];
            this.buyers.push(newEntry);
        }
        for (let i = 0; i < res.data.asks.length; i++) {
            const newEntry = [
                parseFloat(res.data.asks[i][helperTypes_1.PRICE]),
                parseFloat(res.data.asks[i][helperTypes_1.QUANT])
            ];
            this.sellers.push(newEntry);
        }
        // process.stdout.write(`Heyo. ${JSON.stringify(this)}\n`); /* placed here due to how promises work */
        console.log(this); /* change to process.stdout.write() when it is possible */
    }
    binarySearch(type, first, last, targetPrice, prices = []) {
        let mid = 0; /* this will be the ending location to insert, update or delete price */
        /* if buyers, binary search array is ordered from highest price to lowest price
             if sellers, binary search array is ordered from lowest price to highest price
        */
        while (first <= last) {
            mid = Math.floor((+first + +last) / 2);
            const movePriceEntryToEnd = type === helperTypes_1.OrderType.buy
                ? this.buyers[mid][helperTypes_1.PRICE] > targetPrice
                : this.sellers[mid][helperTypes_1.PRICE] < targetPrice;
            const movePriceEntryToStart = type === helperTypes_1.OrderType.buy
                ? this.buyers[mid][helperTypes_1.PRICE] < targetPrice
                : this.sellers[mid][helperTypes_1.PRICE] > targetPrice;
            if (movePriceEntryToEnd) {
                /* move entry towards the end of the array */
                first = mid + 1;
            }
            else if (movePriceEntryToStart) {
                /* move entry towards the start of the array */
                last = mid - 1;
            }
            else {
                /* found entry. Exit */
                first = last + 1;
                break;
            }
        }
        return mid;
    }
}
exports.default = OrderBook;
/* member constants */
OrderBook.DELETE_ENTRY = 0; /* from binance, the delete entry is 0 in quantity */
OrderBook.EMPTY_BOOK = 0;
//# sourceMappingURL=OrderBook.js.map