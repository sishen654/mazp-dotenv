import type { ExecaSyncReturnValue, SyncOptions, ExecaSyncError } from '@esm2cjs/execa'
import { execaCommandSync } from '@esm2cjs/execa'

const run = (args: string[], options: SyncOptions = {}): ExecaSyncReturnValue | ExecaSyncError => {
  try {
    return execaCommandSync(`${args.join(' ')}`, options)
  } catch (error) {
    return error as ExecaSyncError
  }
}

describe("cli", () => {
  test("have not a default config.env", () => {
    let { stderr } = run(["dotenv"])
    expect(stderr).not.toBe("")
  })
  test("specify a env config", () => {
    let { stdout, stderr } = run(["dotenv /__test__/test.env node ./__test__/test.js"])
    expect(stderr).toBe("")
    expect(stdout).toBe("123 | 321 | http://127.0.0.1 | asdhjasdbjb xhacakjsdnk")
  })
  test("pass parameter", () => {
    let { stdout, stderr } = run(["dotenv a=1 b=2 c=3 d=555 node ./__test__/test.js"])
    expect(stderr).toBe("")
    expect(stdout).toBe("1 | 2 | 3 | 555")
  })
})

export { }
