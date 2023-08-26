const { ipcRenderer } = require('electron')
const Vue = require('vue')

document.addEventListener('DOMContentLoaded', () => {
  console.log('首页')
  let isDragging = false
  let offsetX = 0
  let offsetY = 0

  document.addEventListener('mousedown', (e) => {
    // console.log('mousedown')e.log()
    // 鼠标左键为 0 ，鼠标右键为 2
    if (e.button === 2) {
      ipcRenderer.send('openMenu')
      return
    }
    isDragging = true
    offsetX = e.x
    offsetY = e.y
  })

  document.addEventListener('mousemove', (e) => {
    // console.log('mousemove')
    if (!isDragging) return
    const newX = e.screenX - offsetX
    const newY = e.screenY - offsetY
    // 使用 IPC 发送消息给主进程
    ipcRenderer.send('move-window', { x: newX, y: newY })
  })

  document.addEventListener('mouseup', () => {
    // console.log('mouseup')
    offsetX = 0
    offsetY = 0
    isDragging = false
  })
})

const app = Vue.createApp({
  data: () => {
    return {}
  },
  mounted() {},
  methods: {
    // 显示 Demo 窗口
    showDemoWin() {
      ipcRenderer.send('showDemoWin', 'show')
    },
  },
})

app.mount('#app')
