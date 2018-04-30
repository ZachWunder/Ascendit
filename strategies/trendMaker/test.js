class Test {
     constructor () {
          this.control = true
     }

     on () {
          this.control = true
     }
     off () {
          this.control = false
     }

     async main() {
          while (this.control = true) {
               console.log('on')
          }
     }
}

let test = new Test()

test.main()
setTimeout(() => test.off(), 500)
