import mpx, { createApp } from '@mpxjs/core'
import fetch from '@mpxjs/fetch'

mpx.use(fetch)

mpx.i18n.mergeMessages({
  'en-US': {
    message: {
      bye: 'bye'
    }
  },
  'zh-CN': {
    message: {
      bye: '再见'
    }
  }
})

mpx.i18n.mergeLocaleMessage('en-US', {
  message: {
    bye: 'bye'
  }
})

createApp({
  onLaunch () {
    // onLaunch
  }
})
