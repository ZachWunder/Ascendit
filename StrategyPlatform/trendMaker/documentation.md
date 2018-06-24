# TrendMaker
The TrendMaker strategy of Ascendit is an anti-trend market maker which aims to create liquidity and profit in range trading markets.

## Fundamental Overview
The TrendMaker's first component is the market maker. As with other market makers, buy orders are placed at the bid price of the asset, while sell orders are simultaneously placed at the ask price of the asset. However, unlike other market makers, where the orders are placed inside of the bid-ask spread of the asset, the TrendMaker places orders with a user-defined preset profit margin.

The second component of the TrendMaker is the anti-trend component. The TrendMaker will identify trends in the price of the asset and stop the placement of new trades until conditions return to sideways movement where the TrendMaker performs best.

## Technical Overview
As with all Ascendit strategies, the TrendMaker breaks down into three technical components.
1. Signal Generation
2. Risk Management
3. Execution

#### Parameters of Execution
The TrendMaker takes an exchange, currency pair, amount of currency, and risk.

The exchange parameter is a string containing the name of the exchange you would like to run the strategy on (a list is available in the ccxt manual). Ex. 'bittrex', 'bitfenix', 'gdax'.

The currency pair is also a string containing the pair you would like to monitor (also available from the ccxt manual). Ex. 'ADA/USDT', 'ETH/USDT', 'BTC/USDT'.

The amount of currency is the maximum size of position of you would like to take per order. This means that because there are two concurrent orders **twice** this amount is required for use.

The risk parameter is a decimal value that is specific to the anti-trend calculations. It is recommended to set this amount near the percent profit you would like to make, but heavy testing is needed. Ex. .02 for a 2% profit margin, or .03 for a 3% profit margin.

The target profit percentage, also known as your profit margin, is a decimal value for the amount of profit to be made when both buy and sell orders are filled. The higher the value, the less likely it is to be filled. The lower the value, the less profit is made per trade. The TrendMaker was created with an inital thought of ~2% profit margins, which is often slightly outside the bid-ask spread of crypto. Ex. .02 for 2% profit margin, or .03 for a 3% profit margin.

### Strategy Function
The strategy function brings together all components, Signal Generation, Risk Management, and Execution. These are then instantiated based on the specified parameters above. Initial conditions, creating the first buy and sell orders, are then fulfilled. The signal generation's check function is then set on an interval to run every 15 seconds. Finally, the signals are daisy chained, from the signal generation to the risk management, which will emit if the risk is acceptable, to the execution.

### Signal Generation
Signal Generation takes its form as an event emitting class, which takes an exchange and currency pair parameter upon instantiation.

Signal Generation exposes three different events. These are potentially emitted when the classes check function has been called.
1. 'BothFilled' - Emitted when both buy and sell orders have been filled.
2. 'BuyFilled' - Emitted when the buy order has been filled.
3. 'SellFilled' - Emitted when the sell order has been filled.

These are public and can be listened to by anything, a notification handler for example, if desired.

### Risk Management
The risk management's main objective is to stop the TrendMaker during poor conditions, aka non-ranging conditions. It takes the exchange, currency pair and risk parameters.

When the risk management receives the signal that an order has been filled, and is ready to be replaced, it assesses the current market conditions to make sure it is appropriate to continue trading at the time. If they are determined to be ideal, it emits a signal, usually to the execution component, but could be subscribed to by any component.

### Execution
Execution is a straight-forward component, it calculates the necessary parameters for the order(s) and then places it/them.

Execution takes the exchange, currency pair, currency amount, and target profit percentage as parameters.

The parameter for execution that needs to be calculated is only the price at which the order should be placed, as the currency pair, exchange, and amount are already inputted values by the user. The price will always be set so that the realized profit margin will always be greater than or equal to the target profit percentage inputted earlier. This can happen when the bid-ask spread is greater than the target profit percentage. In this case, the price will be set at the bid or ask, depending on if the order is a buy or sell, respectively.
