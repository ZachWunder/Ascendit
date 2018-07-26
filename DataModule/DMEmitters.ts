// All emitter types should be declared as an interface.
interface OHLCV {
    Open: number,
    High: number,
    Low: number,
    Close: number,
    Volume: number,
}

interface BidAsk {
    Bid: number,
    Ask: number,
}

interface OrderCompletion {
    OrderFilled: boolean,
}

// Add new emitter type to this enum
export default enum DataEmitterTypes {
    OHLCV, BidAsk, OrderCompletion
}
