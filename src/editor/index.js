/*

index.js

*/

let objEle = document.createElement("pre")
let editorEle = document.createElement("pre")
let buttonEle = document.createElement("pre")
let cslEle = document.createElement("pre")

document.body.appendChild(objEle)
objEle.appendChild(editorEle)
objEle.appendChild(buttonEle)
objEle.appendChild(cslEle)

let editor = new editor_M(editorEle, (str) => {
  return (str + "\n")
  .replace(/(".+"|[0-9])/gu, "<span class=\"const\">$1</span>")
    //const value
  .replace(/([^\s]+)\(/gu, "<span class=\"func\">$1</span>(")
    //fcuntion name
  .replace(/(\/\/[^\n]*|\/\*.*\*\/)/gu, "<span class=\"comment\">$1</span>")
    //comment
  .replace(/(.+)\n/gu, "<div>$1</div>")
  .replace(/\n\n/gu, "<div><br></div>")
  .replace(/\n/gu, "")
    //newline
  .replace(/(\s+let|\s+if|\s+for|\s+return)/gu, "<span class=\"key\">$1</span>")
    //key word
}, `//main function
main() {
  log("Hello World!")
}`, "div")

let csl = new console_M(cslEle, "div")

console.log = (str) => {
  csl.addText(str)
}

buttonEle.innerHTML = `<input type = "button" value = "Compile" />`
buttonEle.childNodes[0].addEventListener("click", () => {
  const run = (async () => {
    const sc = await new skyland_compiler()
    await sc.compile(editorEle.innerText)
  })()
})

