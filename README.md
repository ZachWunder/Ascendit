# Deprecated
# Ascendit

NodeJS cryptocurrency trading platform.

## Platforms

#### Data Aggregation
 - Store historical data in OHLCV and Orderbook format with support for easily adding others.
 - Use each data set in backtesting.

#### Signal Generation Platform
- Implement custom trading strategies or pick from already implemented ones.

#### Position Sizing and Risk Management Platform
- Receives signals from Signal Generation Platform and either accepts or rejects based on parameters of the trading strategy.

#### Execution Platform
- Places trades defined by the strategy or by manual input

## Setup:

In order to have Ascendit create trades, create a secrets.json in /app.

```json
{
    "apikey": "yourapikeyhere",
    "apisecret": "yourapisecrethere"
}
```

## Built With:
 - [CCXT](https://github.com/ccxt/ccxt) : Used to connect many exchange API's.
 - MongoDB

**In early development**
