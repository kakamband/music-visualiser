/* USAGE: here we define enumerations, interfaces and global constants */

/* the order book type you want to specify */
enum OrderType {
  buy,
  sell
}

/* Question determination for the BinanceExchange  menu  */
enum Input {
  quantity = 1,
  exit = 2,
  mainMenu,
  orderInterest,
  resetTradePair /*future implementation */
}

interface TradePair {
  base: string;
  quote: string;
}

/*export functions down below*/
export const PRICE = 0;
export const QUANT = 1;
export { Input, OrderType, TradePair };
