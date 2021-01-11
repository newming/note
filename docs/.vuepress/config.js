module.exports = {
  title: '代码笔记',
  description: '钮旭明的代码笔记',
  base: '/note/',
  port: '3003',
  configureWebpack: {
    resolve: {
      alias: {
        '@': '../assets/'
      }
    }
  },
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      }
    ],
    sidebar: 'auto',
    sidebarDepth: 3,
    activeHeaderLinks: false
  }
}
