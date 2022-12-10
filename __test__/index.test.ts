import dotenv from "../src/index"
import path from "node:path"

describe("dotenv function", () => {
  test("inject env works", () => {
    dotenv({
      path: path.join(process.cwd() + "/__test__/test.env")
    })
    expect(process.env.a).toEqual("123")
    expect(process.env.b).toEqual("321")
    expect(process.env.c).toEqual("http://127.0.0.1")
    expect(process.env.d).toEqual("asdhjasdbjb xhacakjsdnk")
  })
})

export { }
