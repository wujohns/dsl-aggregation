/**
 * 测试环境部署
 *
 * @author wujohns
 * @date 22/04/22
 */
const dotenv = require("dotenv")
dotenv.config()

const path = require('path')
const _ = require('lodash')
const NodeSSH = require('node-ssh')
const ssh = new NodeSSH()

const deploy = async () => {
  // 链接远端
  const sshConfig = {
    host: process.env.DEPLOY_HOST,
    username: process.env.DEPLOY_USER,
    port: process.env.DEPLOY_PORT,
    privateKey: process.env.DEPLOY_PRIVATEKEY
  }
  await ssh.connect(sshConfig)

  // 上传文件
  const status = await ssh.putDirectory(
    path.join(__dirname, '../'),  // 本地文件上传
    `/www/wwwroot/dsl-dev.bubufly.com`,
    {
      recursive: true,  // 是否递归上传
      concurrency: 1,  // 上传并发数
      validate: (itemPath) => {
        if (
          _.includes(itemPath, 'bin') ||
          _.includes(itemPath, 'node_modules') ||
          _.includes(itemPath, '.git') ||
          _.includes(itemPath, '.gitignore') ||
          _.includes(itemPath, 'makefile') ||
          _.includes(itemPath, '.env') ||
          _.includes(itemPath, 'package.json') ||
          _.includes(itemPath, 'package-lock.json')
        ) {
          return false
        }
        return true
      },
      tick: (localPath, remotePath, err) => {
        if (err) console.log(`upload failed: ${ localPath }`)
        else console.log(`upload successful: ${ localPath }`)
      }
    }
  )
  if (!status) {
    throw new Error('update files failed !')
  }
}
deploy().then(
  () => {
    console.log('finish deploy task!')
    process.exit()
  },
  (err) => {
    console.log(err)
    process.exit()
  }
)
