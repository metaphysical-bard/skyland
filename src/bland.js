/*

bland.js

*/

class bland {

  count(s) {
    this.pos.index += 1
    if (s === "\n") {
      this.pos.row += 1
      this.pos.col = 0
    }
    else { this.pos.col += 1 }
  }

  error(s = "") {
    this.log += "error : row " + (this.pos.row + 1) + ", col " + (this.pos.col + 1)
    this.log += ", symbol : " + this.s[this.pos.index] + "\n"
    this.log += s
  }

  symbolCh(s){
    switch (s) {
      case "!" : case "\"" : case "#" : case "$" : case "%" : case "&" : case "'" :
      case "(" : case ")" : case "-" : case "=" : case "~" : case "^" : case "|" :
      case "@" : case "`" : case "+" : case ";" : case "*" : case ":" : case "[" :
      case "]" : case "{" : case "}" : case "," : case "." : case "<" : case ">" :
      case "/" : case "?" : case "\\" : case " " : case "\n" :
        return true
    }
  }

  comment() {
    let state = 0
    while (this.pos.index < this.s.length && this.log === "") {
      let s = this.s[this.pos.index]
      switch (state) {
        case 0 :
          switch (s) {
            case "/" :
              state = 1
              break
            case "*" :
              state = 2
              break
            default :
              this.error("comment")
              return
          }
          break
        case 1 :
          if (s === "\n") { return }
          break
        case 2 :
          if (s === "*") { state = 3 }
          break
        case 3 :
          if (s === "/") { return }
          else { state = 2 }
      }
      this.count(s)
    }
    this.error("comment")
  }

  arguments() {
    let ary = ["arguments"]
    let state = 0
    let word = ""
    while (this.pos.index < this.s.length && this.log === "") {
      let s = this.s[this.pos.index]
      if (this.symbolCh(s) === true) {
        if (word === "") {
          if (s === ")") {
            this.count(s)
            return ary
          }
          this.error("arguments")
        }
        else {
          if (state === 0) {
            if (s === ")") { this.error("arguments") }
            else {
              switch (word) {
                case "i32" :
                  ary.push("i32")
                  break
                case "f32" :
                  ary.push("f32")
                  break
                case "i64" :
                  ary.push("i64")
                  break
                case "f64" :
                  ary.push("f64")
                  break
                default : this.error("arguments")
              }
              state = 1
              word = ""
            }
          }
          else {
            ary.push(word)
            if (s === ")") {
              this.count(s)
              return ary
            }
            state = 0
            word = ""
          }
        }
      }
      else { word += s }
      this.count(s)
    }
    this.error("arguments")
  }

  set() {

  }

  logString() {
    let ary = ["call", "log"]
    let state = 0
    let word = ""
    while (this.pos.index < this.s.length && this.log === "") {
      let s = this.s[this.pos.index]
      switch (state) {
        case 0 :
          if (s === "(") { state = 1 }
          else { this.error("log") }
          break
        case 1 :
          if (s === "\"") { state = 2 }
          else { this.error("log") }
          break
        case 2 :
          if (s === "\"") {
            ary.push(word)
            return ary
          }
          else { word += s }
      }
      this.count(s)
    }
    this.error("log")
    return false
  }

  orders() {
    let ary = []
    ary.push(this.arguments())
    let state = 0
    let word = ""
    while (this.pos.index < this.s.length && this.log === "") {
      let s = this.s[this.pos.index]
      if (this.symbolCh(s) === true) {
        switch (state) {
          case 0 :
            if (s === " " || s === "\n") {
              if (word !== "") { this.error("orders") }
            }
            else if (s === "{") { state = 1 }
            else { this.error("orders") }
            break
          case 1 :
            if (s === "}") {
              this.count(s)
              return ary
            }
            else {
              if (word !== "") {
                switch (word) {
                  case "i32" : case "f32" : case "i64" : case "f64" :
                    ary.push(this.set(word))
                    word = ""
                    break
                  case "log" :
                    ary.push(this.logString())
                    word = ""
                    break
                  default : { this.error("orders") }
                }
              }
            }
        }
      }
      else { word += s }
      this.count(s)
    }
    this.error("orders")
  }

  convert(code) {
    this.s = Array.from(code)
    this.list = []
    this.pos = { row : 0, col : 0, index : 0 }
    this.log = ""
    let word = ""
    while (this.pos.index < this.s.length && this.log === "") {
      let s = this.s[this.pos.index]
      switch (s) {
        case "/" :
          this.count(s)
          this.comment()
          word = "", s = "\n"
          break
        case "(" :
          this.count(s)
          this.list.push({type : "function", name : word, orders : this.orders() })
          word = "", s = "}"
          break
        default :
          if (this.symbolCh(s) === true) { this.error() }
          else { word += s }
      }
      this.count(s)
    }
    return { list : this.list, log : this.log }
  }
}

