/**
 * @file unit test example
 * docs of miniprogram-simulate: https://github.com/wechat-miniprogram/miniprogram-simulate
 */
const testUtils = require('@mpxjs/test-utils')
const { proxyFetch } = require("@mpxjs/test-utils")
const mpx = require('@mpxjs/core').default
const fetch = require('@mpxjs/fetch')
const {default: store} = require("src/store/index");

const compPath = 'src/components/example.mpx'

mpx.use(fetch)

describe('test list component', () => {
  beforeEach(() => {
    // 进行usingComponents 组件 mock
    testUtils.mockComponents([
      'list'
    ])
  })

  it('check components instance data', function () {
    const comp = testUtils.createCompAndAttach(compPath)
    const insData = comp.instance.data
    testUtils.checkExpectedData(insData, {
      someClassShowOne: false,
      someClassShowTwo: false,
      someClassShowTwoFlag: false,
      listData2: ["手机", "电视", "电脑"],
      key: 1,
      compStatus: 1,
      timeDeferFlag: false
    })
    const domHTML = comp.dom.innerHTML
    expect(domHTML).toMatchSnapshot()
  })

  it ('test comp different data', async function () {
    proxyFetch('api/somePackage/getCompData', {
      status: 1
    })
    const comp = testUtils.createCompAndAttach(compPath)
    // 目前 status 为 1
    proxyFetch('api/somePackage/getCompData', {
      status: 2
    })
    await comp.instance.fetchCompData()
    await comp.instance.$nextTick()
    expect(comp.instance.data.compStatus).toBe(2)
    expect(comp.instance.data.compData).toEqual({status: 2})
    expect(comp.dom.innerHTML).toMatchSnapshot()

    proxyFetch('api/somePackage/getCompData', {
      status: 3
    })
    await comp.instance.fetchCompData()
    await comp.instance.$nextTick()
    expect(comp.instance.data.compStatus).toBe(3)
    expect(comp.instance.data.compData).toEqual({status: 3})
    expect(comp.dom.innerHTML).toMatchSnapshot()
  })

  it('test props different values correspond to different performance', function () {
    // 传入初始渲染 props
    const successContent = 'some successContent'
    const comp = testUtils.createCompAndAttach(compPath, {
      successContent
    })
    const childComp = comp.querySelector('.successContent')
    expect(childComp).toBeDefined()
    expect(comp.instance.data.successContent).toBe(successContent)
    expect(childComp.dom.innerHTML).toMatchSnapshot()
  })

  it ('test data someClassShowOne change', async function () {
    proxyFetch('api/somePackage/getCompData', {
      status: 1
    })
    const comp = testUtils.createComp(compPath)
    const fetchCompDataSpy = jest.spyOn(comp.instance, 'fetchCompData')
    comp.attach(document.body)    // 改变组件实例相应数据
    comp.instance.someClassShowOne = true
    await comp.instance.$nextTick()
    // watch someClassShowOne change run fetchCompData
    expect(fetchCompDataSpy).toHaveBeenCalledTimes(2)
    expect(comp.dom.innerHTML).toMatchSnapshot()
  })

  it ('test computed someCompShow change', async function() {
    proxyFetch('api/somePackage/getCompData', {
      status: 1
    })
    const comp = testUtils.createCompAndAttach(compPath)
    const compData = comp.instance.data
    const store = require('src/store/index').default
    store.commit('setSomeCompShow', true)
    await comp.instance.$nextTick()
    expect(compData.someCompShow).toBeTruthy()
    testUtils.checkExpectedHTML(comp, ['.someCompShow', 'someCompShow content'])
  })

  it ('test someClassShowTwoFlag tap event trigger', async function () {
    const comp = testUtils.createComp(compPath)
    const fetchCompDataSpy = jest.spyOn(comp.instance, 'fetchCompData')
    const changeSomeClassShowTwoFlagSpy = jest.spyOn(comp.instance, 'changeSomeClassShowTwoFlag')
    proxyFetch('api/somePackage/getCompData', {
      status: 1
    })
    comp.attach(document.body)
    const compData = comp.instance.data
    const changeFlagViewComp = comp.querySelector('.changeFlagClass')

    // dispatchEvent 为异步
    changeFlagViewComp.dispatchEvent('tap')
    await testUtils.sleep(0)

    expect(changeSomeClassShowTwoFlagSpy).toBeCalledWith(true)
    expect(fetchCompDataSpy).toHaveBeenCalledTimes(2)
    expect(compData.someClassShowTwo).toBeTruthy()
    expect(comp.instance.someClassShowTwoFlag).toBeTruthy() // 此处注意 非template中使用过到的data，获取更新后的值，从instance中获取
    expect(comp.dom.innerHTML).toMatchSnapshot()
  })

  it('test someTimeDeferAction tap event trigger', async function () {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    const comp = testUtils.createCompAndAttach(compPath)
    const compData = comp.instance.data
    const someTimeDeferActionSpy = jest.spyOn(comp.instance, 'someTimeDeferAction')
    const childComp = comp.querySelector('.someTimeDeferActionClass')
    childComp.dispatchEvent('tap')

    // comp.instance.someTimeDeferAction()
    await Promise.resolve()

    jest.runAllTimers()
    await comp.instance.$nextTick()

    expect(compData.timeDeferFlag).toBeTruthy()
    expect(someTimeDeferActionSpy).toHaveBeenCalledTimes(1)
    expect(comp.dom.innerHTML).toMatchSnapshot()
    jest.useRealTimers()
  })

  it('test method fetchCompData called correctly', function () {
    proxyFetch('api/somePackage/getCompData', {
      status: 1
    })
    const comp = testUtils.createComp(compPath)
    const fetchCompDataSpy = jest.spyOn(comp.instance, 'fetchCompData')
    comp.attach(document.body)    // attached 生命周期默认执行一次
    expect(fetchCompDataSpy).toHaveBeenCalledTimes(1)
  })

})
