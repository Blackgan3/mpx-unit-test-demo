const simulate = require('@mpxjs/miniprogram-simulate')

describe('test components list', () => {
  it('components instance data', function () {
    const id = simulate.loadMpx('src/components/list.mpx')
    const comp = simulate.render(id)
    expect(comp.data.listData.length).toBe(3)
    expect(comp.data.listData).toEqual(["手机", "电视", "电脑"])
  })
  it('components innerHtml', function (done) {
    const id = simulate.loadMpx('src/components/list.mpx')
    const comp = simulate.render(id)
    const childrenComp = comp.querySelectorAll('.index')
    expect(childrenComp.length).toBe(3)
    comp.triggerLifeTime('attached')
    setTimeout(() => {
      expect(comp.data.attachedTrigger).toBe(true)
      done()
    },1000)
  });
})
