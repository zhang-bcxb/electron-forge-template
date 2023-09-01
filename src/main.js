const {app, Menu, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const {createMainWindow, createDemoWindow} = require('./window.js')
const menuConfig = require('./config/menuConfig')

// 设置应用菜单
const menu = Menu.buildFromTemplate(menuConfig)
Menu.setApplicationMenu(menu)

// 定义所有可能用到的页面
const pages = {
  mainWin: undefined,
  demoWin: undefined,
}

// 主窗口宽高设置
const mainConfig = {
  width: 500,
  height: 300,
}

// electron-squirrel-startup 模块
// 这个模块是 Electron 针对 Squirrel 的启动脚本，用于处理一些安装和卸载时的特殊情况。
// 这段代码检查是否在 Squirrel 启动过程中运行，如果是，则调用 app.quit() 方法退出应用程序。
// 这是因为在安装或卸载过程中，通常不需要运行实际的应用程序逻辑。
if (require('electron-squirrel-startup')) {
  app.quit()
}

/****************************************【应用程序相关事件】****************************************/

// 当 Electron 应用程序初始化完成且准备就绪时，该事件会被触发。
// 通常在这里执行应用程序初始化的操作，比如创建窗口、加载页面等。
app.on('ready', () => {
  pages.mainWin = createMainWindow(mainConfig)
})

// 当应用程序中的所有窗口都被关闭时，该事件会被触发
// 通常在这里执行退出应用程序的操作。
app.on('window-all-closed', () => {
  // 检查当前运行的操作系统是否不是 macOS
  if (process.platform !== 'darwin') {
    // 如果不是 macOS，就执行退出应用程序的操作
    app.quit()
  }
})

// 当应用程序被激活时（例如点击应用程序的图标），该事件会被触发
// 通常在这里执行一些初始化操作或者打开窗口。
app.on('activate', () => {
  // 检查当前是否没有打开的窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    pages.mainWin = createMainWindow(mainConfig)
  }
})

/****************************************【主进程监听事件相关】****************************************/

// IPC 通信处理窗口移动
ipcMain.on('move-window', (event, data) => {
  pages.mainWin.setBounds({x: data.x, y: data.y, width: mainConfig.width, height: mainConfig.height})
})

// 打开 Demo 窗口
ipcMain.on('showDemoWin', (e, data) => {
  if (pages.demoWin) {
    // 如果已经打开了 就关闭重打开
    pages.demoWin.close()
    pages.demoWin = null
  }
  // 创建 Demo 窗口
  pages.demoWin = createDemoWindow()
  // 触发关闭窗口事件
  pages.demoWin.on('close', (e, data) => {
    pages.demoWin = null
  })
})

// 打开右键菜单
let suspensionMenu
ipcMain.on('openMenu', (e) => {
  if (!suspensionMenu) {
    // 不存在菜单就进行创建
    suspensionMenu = Menu.buildFromTemplate([
      {
        label: '开发者工具',
        click: () => {
          pages.mainWin.webContents.openDevTools({mode: 'detach'})
        },
      },
      {
        label: '重启',
        click: () => {
          app.quit()
          app.relaunch()
        },
      },
      {
        label: '退出',
        click: () => {
          app.quit()
        },
      },
    ])
  }
  // 在鼠标位置显示菜单
  suspensionMenu.popup({})
})
