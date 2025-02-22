/*

skyland_compiler.js

*/

class skyland_compiler {
  constructor() {
    return (async () => {
      this.bland = new bland()
      this.cland = new cland()
      await WabtModule().then((wabt) => this.wabt = wabt)
      return this
    })()
  }

  async compile(code) {
    const obj = this.bland.convert(code)
    const wat = this.cland.convert(obj.list)

    const wasmModule = this.wabt.parseWat("main.wat", wat)
    const buffer = wasmModule.toBinary({
      log : true,
      canonicalize_lebs : true,
      relocatable : false,
      write_debug_names : false
    })
  
    wasmModule.destroy()

    const memory = new WebAssembly.Memory({ initial: 1 })
    const importObject = {
      console: {
        log(offset, length) {
          const bytes = new Uint8Array(memory.buffer, offset, length);
          const string = new TextDecoder("utf8").decode(bytes);
          console.log(string)
        }
      },
      js: {
        mem: memory
      }
    }
  
    await WebAssembly.instantiate(buffer.buffer, importObject).then(
      (results) => {
        results.instance.exports.main()
      }
    )
  }
}

