const { BrowserWindow, screen } = require('electron')
const path = require('path')

// 创建主窗口（main）
const createMainWindow = (mainConfig) => {
  // 获得屏幕的宽高
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // 创建窗口
  const win = new BrowserWindow({
    // 窗口宽高设置
    width: mainConfig.width,
    height: mainConfig.height,
    // 计算窗口显示位置
    x: (width - mainConfig.width) / 2,
    y: (height - mainConfig.height) / 2,
    // 设置窗口的类型为 'toolbar'，这通常用于创建类似于工具栏的特殊窗口。
    type: 'toolbar',
    // 设置窗口的外框（标题栏和窗口边框）不显示，使窗口成为一个无边框窗口。
    frame: false,
    // 禁止窗口的大小可调整
    resizable: false,
    // 设置窗口背景为透明，使窗口的内容可以透过窗口看到后面的内容
    transparent: true,
    // 将窗口置于其他窗口之上，始终保持在最顶层
    alwaysOnTop: true,
    // 设置窗口的 WebPreferences（Web 配置选项），包括一些与网页内容相关的设置
    webPreferences: {
      // 允许在渲染进程中使用 Node.js 模块。
      nodeIntegration: true,
      // 关闭上下文隔离，允许在渲染进程中直接访问全局对象。
      contextIsolation: false,
      // 启用 remote 模块，允许渲染进程访问主进程的模块。
      enableRemoteModule: true,
      // 关闭 Web 安全策略，允许跨域请求等。
      webSecurity: false,
      // 指定一个预加载的脚本（preload.js），可以在渲染进程中提前注入一些代码。
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  // 加载一个 HTML 文件到窗口中
  win.loadFile(path.resolve(__dirname, 'views/main/index.html'))

  // 设置窗口是否忽略鼠标事件
  // win.setIgnoreMouseEvents(true, { forward: true })
  // 在窗口中打开开发者工具
  // win.webContents.openDevTools({ mode: 'detach' })

  return win
}

// 创建演示窗口（demo）
const createDemoWindow = () => {
  const { left, top } = { left: screen.getPrimaryDisplay().workAreaSize.width - 400, top: screen.getPrimaryDisplay().workAreaSize.height - 800 }
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    minWidth: 300,
    x: left,
    y: top,
    webPreferences: {
      // 允许在渲染进程中使用 Node.js 模块
      nodeIntegration: true,
      // 关闭上下文隔离，允许在渲染进程中直接访问全局对象。
      contextIsolation: false,
      // 启用 remote 模块，允许渲染进程访问主进程的模块。
      enableRemoteModule: true,
      // 指定一个预加载的脚本（preload.js），可以在渲染进程中提前注入一些代码。
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile(path.join(__dirname, 'views/demo/index.html'))
  // win.webContents.openDevTools()
  return win
}

module.exports = {
  createMainWindow,
  createDemoWindow,
}
