/**
 * @file unit test example
 * docs of miniprogram-simulate: https://github.com/wechat-miniprogram/miniprogram-simulate
 */
const testUtils = require('@mpxjs/test-utils')
const { proxyFetch } = require("@mpxjs/test-utils")
const mpx = require('@mpxjs/core').default
const fetch = require('@mpxjs/fetch')
const {default: store} = require("src/store/index");

const compPath = 'src/pages/index.mpx'

mpx.use(fetch)
let comp = null
describe('test list component', () => {
  beforeAll(() => {
    // 进行usingComponents 组件 mock
    testUtils.mockComponents([
      'list'
    ])
    comp = testUtils.createCompAndAttach(compPath)
  })


  it('check components instance data123', async function () {
    comp.triggerLifeTime('detached')
    await comp.instance.$nextTick()
    const domHTML = comp.dom.innerHTML
    expect(domHTML).toMatchSnapshot()
  })

})
