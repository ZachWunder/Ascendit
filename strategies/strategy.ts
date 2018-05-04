export interface Strategy {
     capital : number
     state : string
     riskTolerance : number
     start ()
     newTick()
}
