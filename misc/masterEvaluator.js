//Require all strategies risk logic
const trendMakerRiskLogic = require('./trendMaker').logic;

//Require all strategies signal EventEmitter
const trendMakerSignalEmitter = require('../SignalGenPlatform/trendMaker').emitter

//When signal is emitted, run RiskLogic

//TrendMaker
trendMakerSignalEmitter.on('emit', trendMakerRiskLogic(context));
trendMakerSignalEmitter.on('otherEmit', diffTrendMakerRiskLogic(context));

//MomentumSwitch


//DCA
