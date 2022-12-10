import { join, extname } from 'node:path'
import dotenv from './index.js'

const ORIGIN_ARGS = process.argv.splice(2)
// 1 判断是否传入的首选项是 env 文件
const CUSTOMIZE_PATH = ORIGIN_ARGS[0] || ""
const isEnvFile = extname(CUSTOMIZE_PATH) === ".env";
// 2 判断是否传入注入参数
const REGX = /([\w]+)=([^\s]+)/
const injectArr: string[] = []
let commandArr: string[] = []
let matchFinish = false
if (!isEnvFile) {
  ORIGIN_ARGS.forEach(arg => {
    let matches = arg.match(REGX)
    if (!matchFinish && matches) {
      injectArr.push(matches[1], matches[2])
    } else {
      // 匹配完后就不在匹配注入
      matchFinish = true
      commandArr.push(arg)
    }
  })
} else {
  commandArr = [...ORIGIN_ARGS].splice(1)
}
// 3 runtime 注入
if (injectArr[0]) {
  dotenv({ path: injectArr, command: commandArr })
}
// 4 文件注入
else {
  // 首个参数为 env 文件，否则为默认文件
  const CURRENT_PATH = process.cwd()
  const DEFAULT_CONFIG_PATH = "./config.env"
  const CONFIG_ABSOLUTE_PATH = isEnvFile ? join(CURRENT_PATH, CUSTOMIZE_PATH) : join(CURRENT_PATH, DEFAULT_CONFIG_PATH)
  dotenv({ path: CONFIG_ABSOLUTE_PATH, command: commandArr })
}



