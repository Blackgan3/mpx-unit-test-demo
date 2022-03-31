import mpx, { createPage } from '@mpxjs/core'

createPage({
  onLoad () {
    // onLoad
    console.log('onLoad trigger')
  },
  onShow () {
    console.log('onShow trigger')
  },
  onReady() {
    console.log('onReady trigger 333')
  },
  onHide() {
    console.log('onHide trigger')
  },
  onUnload() {
    console.log('onUnload trigger')
  },
  attached() {
    console.log('attached trigger')
  },
  detached() {
    console.log('detached trigger')
  },
  methods: {
    attached() {
      console.log('attached trigger 222')
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      console.log('page life trigger')
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
