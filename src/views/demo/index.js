const { ipcRenderer } = require('electron')
const Vue = require('vue')

const app = Vue.createApp({
  data: () => {
    return {
      msg: '你好，我是编程细胞',
    }
  },
  mounted() {},
  methods: {},
})

app.mount('#app')
