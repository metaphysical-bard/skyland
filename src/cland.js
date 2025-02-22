/*

cland.js

*/

class cland {
  convert(list) {
    let code = '(module\n  (import "console" "log" (func $log (param i32 i32)))\n  (import "js" "mem" (memory 1))'
    let memoryBuffer = []
    let memoryOffset = 0
    let funcStr = ""
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === "function") {
        funcStr += '\n  (func (export "main")'
        for (let j = 0; j < list[i].orders.length; j++) {
          if (list[i].orders[j][0] === "call") {
            memoryBuffer.push([memoryOffset, list[i].orders[j][2]])
            let strLen = list[i].orders[j][2].length
            funcStr += '\n    i32.const ' + memoryOffset
            memoryOffset += strLen
            funcStr += '\n    i32.const ' + memoryOffset + '\n    call $log'
          }
        }
        funcStr += ')'
      }
    }
    
    for (let i = 0; i < memoryBuffer.length; i++)
      code += '\n  (data (i32.const ' + memoryBuffer[i][0] + ') "' + memoryBuffer[i][1] + '")'
    return code + funcStr + ")"
  }
}

