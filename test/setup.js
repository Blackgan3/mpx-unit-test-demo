global.__mpx_mode__ = 'wx'

// 后续替换为 mpx
global.wx = {
  preloadAd: () => {}
}


jest.mock('@mpxjs/core', () => {
  const originalMpx = jest.requireActual('@mpxjs/core')
  if (originalMpx.default) {
    originalMpx.default.getSystemInfoSync = jest.fn().mockImplementation(() => {
      return {
        version: '7.0.4',
        system: 'iOS 13',
        platform: 'iOS',
        brand: 'iphone',
        SDKVersion: '2.7.10',
        safeArea: {
          bottom: 54
        }
      }
    })
    originalMpx.default.getStorageSync = jest.fn().mockImplementation(() => {
      return {}
    })
    originalMpx.default.i18n = {
      locale: 'zh',
      t: () => {
        return ''
      }
    }
  }

  return originalMpx
})
