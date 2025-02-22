# skyland

## これ is 何？
`skyland`は[C++AMP](https://learn.microsoft.com/ja-jp/cpp/parallel/amp/cpp-amp-overview?view=msvc-170)のようにCPUとGPUの処理を同じ文法ルールで記述することができるプログラミング言語です。

<br>

## Example Code
```sland
//main function
main() {
  log("Hello World!")
}
```
```sland
//add
main() {
  let a = 10
  let b = 10
  let c = add(a, b)
  log(c)
}
```
```sland
func(a) {
  return add(a, 1)
}

main() {
  let a = {0, 1, 2, 3}//array type
  let b = {0, 0, 0, 0}
  let c = 0

  /* by the CPU */
  log("CPU : ")
  for (let i, 4) {
    c = func(a[i])
    log(c)
  }

  log("\n")

  /* by the GPU */
  log("GPU")
  ga = setBuf("DST", a)
  gb = setBuf("SRC")
  gb = parallel_for_each(4, 1, 1, func, ga)
  copy(gb, b)
  for (let i, 4) {
    log(b[i])
  }
}
```

<br>

## \\(><
- 現在工事中
- skylandも開発中
- 一週間ぐらいで終わらせたい…！！(希望的観測

<br>

## リンク集
[GitHub](https://github.com/metaphysical-bard/skyland)<br>
[Home Page](https://metaphysical-bard.github.io/skyland/)<br>
[Contact](https://metaphysical-bard.github.io/skyland/contact/)<br>

