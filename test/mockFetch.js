let mockfetchInstalled = false
jest.mock('@mpxjs/fetch', () => {
  return {
    install: (proxyMPX, options = {}, MPX) => {
      if (mockfetchInstalled) return
      mockfetchInstalled = true
      proxyMPX.xfetch = {
        interceptors: {
          request: {
            use: () => {}
          }
        },
        fetch: (options) => {
          return new Promise((resolve) => {
            let data = {}
            // if (options.url.includes('api/somePackage/getCompData')) {
            //   data = {
            //     status: 1
            //   }
            // }
            resolve({
              errno: 0,
              data:{}
            })
          })
        }
      }
    },
    XFetch: () => {
      return {
        CancelToken: () => {},
        fetch: () => {
          return new Promise((resolve) => { resolve() })
        }
      }
    }
  }
})


global.mpx = require('@mpxjs/core').default
