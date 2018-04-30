export interface Strategy {
     capital : number
     state : string
     riskTolerance : number
     control: string
     newTick() : void
}
