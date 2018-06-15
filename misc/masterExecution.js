//Require all strategies execution logic
const trendMakerExecutionLogic = require('./trendMaker').logic;

//Require all strategies risk EventEmitter
const trendMakerSignalEmitter = require('../RiskPortfolioPlatform/trendMaker').emitter;

trendMakerSignalEmitter.on('newOrder', trendMakerExecutionLogic(context));
