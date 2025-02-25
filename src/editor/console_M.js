/*

console_M.js

*/

class console_M {
  constructor(ele, tag) {
    this.ele = ele
    this.tag = tag
    this.addText("Push Compile Button")
  }

  addText(str = "") {
    let e = document.createElement(this.tag)
    e.innerText = "> " + str
    this.ele.appendChild(e)
  }
}

