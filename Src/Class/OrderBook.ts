/* USAGE: local order book */
import axios from 'axios';
import { OrderType, TradePair, PRICE, QUANT} from "./helperTypes";


export default class OrderBook {
  /* member constants */
  public static readonly DELETE_ENTRY = 0; /* from binance, the delete entry is 0 in quantity */
  public static readonly EMPTY_BOOK = 0;

  /* private members */
  private buyers: [number, number][] = [];
  private sellers: [number, number][] = [];
  private lastUpdateId: number = -1;


  /* constructor */
  public constructor(depth: number = 1000, tPair: TradePair = { base: 'BTC', quote: 'USDT' }) {
    tPair = { base: tPair.base.trim(), quote: tPair.quote.trim() };
    const snapshotURL = `https://www.binance.com/api/v1/depth?symbol=${tPair.base + tPair.quote}&limit=${depth.toString()}`;

    axios.get(snapshotURL) /* gets snapshot data */
      .then(this.parseBinanceOrderBookSnapshot.bind(this))
      .catch((error: any) => {
        process.stderr.write(`error in retrieving orderbook snapshot from binance: ${error.response.data.msg}\n`);
        process.stderr.write(`Exiting program`);
        process.exit();
    });
  }

  /* getters and setters */
  public getLastUpdateId(): number {
    return this.lastUpdateId;
  }
  public setLastUpdateId(id: number) {
    this.lastUpdateId = id;
  }

  /* user functions */
  public updateOrderBook(type: OrderType, target: [number, number]): void {  /* updation through binary search */

    const prices: [number, number][] = (type === OrderType.buy) ? this.buyers : this.sellers;
    const binIndex: number = this.binarySearch(type, 0, prices.length - 1, target[0], prices);

    /*determine whether to update, delete, insert entry or do nothing */
    if (prices.length !== OrderBook.EMPTY_BOOK) { /* if local order book is not empty */
      if (target[PRICE] === prices[binIndex][PRICE]) { /* if found */
        (target[QUANT] === OrderBook.DELETE_ENTRY) ? prices.splice(binIndex, 1) : prices[binIndex][QUANT] = target[QUANT]; /* if true delete, else update */
      }
      else if (target[QUANT] !== OrderBook.DELETE_ENTRY) { /* not found, insert */
        switch (type) {
          case OrderType.buy: /* highest price to lowest price - buyers */
            (target[PRICE] > prices[binIndex][PRICE]) ? prices.splice(binIndex, 0, target) : prices.splice(binIndex + 1, 0, target);
            break;
          case OrderType.sell:
            (target[PRICE] < prices[binIndex][PRICE]) ? prices.splice(binIndex, 0, target) : prices.splice(binIndex + 1, 0, target);
            break;
        }
      }
    } else { /* empty order book */
      if (target[QUANT] !== OrderBook.DELETE_ENTRY) { /* add to order book if not delete entry */
        prices.push(target);
      }
    }
  }


  /* private functions */
  private parseBinanceOrderBookSnapshot(res: any) {
    this.lastUpdateId = res.data.lastUpdateId;

    for (let i = 0; i < res.data.bids.length; i++) { /*design choice to seperate buyers and sellers. 
                                                      A possibility for initial snapshot to be of varying lengths of buyers and sellers (although low chance) */
      const newEntry: [number, number] = [parseFloat(res.data.bids[i][PRICE]), parseFloat(res.data.bids[i][QUANT])];
      this.buyers.push(newEntry);
    }
    for (let i = 0; i < res.data.asks.length; i++) {
      const newEntry: [number, number] = [parseFloat(res.data.asks[i][PRICE]), parseFloat(res.data.asks[i][QUANT])];
      this.sellers.push(newEntry);
    }
    // process.stdout.write(`Heyo. ${JSON.stringify(this)}\n`); /* placed here due to how promises work */
    console.log(this); /* change to process.stdout.write() when it is possible */
  }

  private binarySearch(type: OrderType, first: number, last: number, targetPrice: number, prices: [number, number][] = []): number {
    let mid: number = 0; /* this will be the ending location to insert, update or delete price */

    /* if buyers, binary search array is ordered from highest price to lowest price
         if sellers, binary search array is ordered from lowest price to highest price
    */
    while (first <= last) {
      mid = Math.floor((+first + +last) / 2);
      const movePriceEntryToEnd :boolean = (type === OrderType.buy)? (this.buyers[mid][PRICE] > targetPrice): (this.sellers[mid][PRICE] < targetPrice);
      const movePriceEntryToStart :boolean = (type === OrderType.buy)? (this.buyers[mid][PRICE] < targetPrice): (this.sellers[mid][PRICE] > targetPrice);
        if (movePriceEntryToEnd) {  /* move entry towards the end of the array */
          first = mid + 1;
        } else if (movePriceEntryToStart) {  /* move entry towards the start of the array */
          last = mid - 1;
        } else { /* found entry. Exit */
          first = last + 1;
          break;
        }
      }
    return mid;
  }
}

