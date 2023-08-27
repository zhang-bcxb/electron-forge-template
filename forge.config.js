// Electron Forge 工具的配置文件，用于配置项目的各种设置和选项。
// 通过编辑这个配置文件，你可以指定应用程序的行为、构建过程、发布设置等。
module.exports = {
  // 配置打包选项
  packagerConfig: {
    // 指定 Windows 平台上的元数据
    win32metadata: {
      // 设置应用程序的产品名称
      ProductName: 'DemoTemp',
    },
  },
  // 配置重新编译选项，用于在构建过程中重新编译依赖项
  rebuildConfig: {},
  // 用于生成发布文件的制造商
  makers: [
    {
      // 用于 Windows 平台
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      // 用于 macOS 平台
      name: '@electron-forge/maker-zip',
      // 只在 macOS 上使用
      platforms: ['darwin'],
    },
    {
      // 用于生成 Debian 软件包
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      // 用于生成 RPM 软件包
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
}
