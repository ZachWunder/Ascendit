const TrendMaker = require('strategies/trendMaker/prototype')

(function () => {
  // Declare all running strategies
  const firstTrendMakerStrategy = TrendMaker()

  // Start all strategies
  firstTrendMakerStrategy.start()

  while (true) {
    // Run all strategies' newTick bittrexFunctions

    firstTrendMakerStrategy.newTick()
  }
}}()
