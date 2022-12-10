import fs from "node:fs"
import { execaCommandSync } from '@esm2cjs/execa'


export interface DotenvOption {
  path?: string | string[];
  command?: string[]
}

export default function dotenv(option: DotenvOption): void {
  // 1 注入
  option.path = option.path ? option.path : "config.env"
  // 2 判断类型执行
  let matchArr: string[] = []
  if (Array.isArray(option.path)) {
    matchArr = option.path
  } else {
    const result = fs.readFileSync(option.path, { encoding: "utf-8" })
    const reg = /[^=\n]+/g
    matchArr = result.match(reg) || []
    if (matchArr.length % 2 !== 0) {
      throw Error('Invalid configuration, please check your config file')
    }
  }
  // 3 注入
  for (let i = 0; i < matchArr.length; i++) {
    const key = matchArr[i]
    const val = matchArr[++i].replaceAll('"', "")
    // 内部存在的值不进行覆盖
    if (!process.env[key]) {
      process.env[key] = val
    }
  }

  // 2 执行后续命令
  if (option.command && option.command[0]) {
    try {
      execaCommandSync(option.command.join(' '), { stdout: "inherit" })
    } catch (error) {
      // @ts-ignore
      console.log(error.stderr);
    }
  }
}

