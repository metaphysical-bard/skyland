/*

bland.js

*/

class bland {
  space() {
    switch (this.state) {
      case 0 :
        this.log = "error"
        break
      case 6 :
        this.word += " "
        break
    }
  }

  leftParenthesis() {
    switch (this.state) {
      case 0 :
        this.obj.type = "function"
        this.obj.name = this.word
        this.word = ""
        this.obj.orders = []
        this.state = 1
        break
      case 3 :
        this.order[0] = "call"
        this.order[1] = this.word
        this.word = ""
        this.state = 5
        break
      default :
        this.log = "error"
    }
  }

  rightParenthesis() {
    switch (this.state) {
      case 1 :
        this.state = 2
        break
      case 8 :
        this.state = 9
        this.obj.orders.push(this.order)
        this.order = []
        break
      default :
        this.log = "error"
    }
  }

  leftCurlyBrace() {
    switch (this.state) {
      case 2 :
        this.state = 3
        break
      default :
        this.log = "error"
    }
  }

  rightCurlyBrace() {
    switch (this.state) {
      case 3, 9 :
        this.list.push(this.obj)
        this.obj = {}
        this.state = 0
        break
      default :
        this.log = "error"
    }
  }

  doubleQuotation() {
    switch (this.state) {
      case 5 :
        this.state = 6
        break
      case 6 :
        this.order.push(this.word)
        this.word = ""
        this.state = 8
        break
      default :
        this.log = "error" + this.state
    }
  }

  convert(code) {
    const s = Array.from(code.replace(/\/\/[^\n]*\n|\/\*.*\*\//gu, ""))
    this.list = []
    this.state = 0
    this.obj = {}
    this.order = []
    this.word = ""
    this.log = ""
    for (let i = 0; i < s.length; i++) {
      if (this.log !== "")
        return { list : this.list, log : this.log }
      switch (s[i]) {
        case " " :
          this.space()
          break
        case "(" :
          this.leftParenthesis()
          break
        case ")" :
          this.rightParenthesis()
          break
        case "{" :
          this.leftCurlyBrace()
          break
        case "}" :
          this.rightCurlyBrace()
          break
        case "\"" :
          this.doubleQuotation()
          break
        case "\n" :
          break
        default :
          this.word += s[i]
      }
    }
    return { list : this.list, log : this.log }
  }
}

