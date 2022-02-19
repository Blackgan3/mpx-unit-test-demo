import mpx, {createStore} from '@mpxjs/core'

const store = createStore({
  state: {
    count: 0,
    compData: {},
    someCompShow: false
  },
  mutations: {
    setSomeCompShow (state, payload) {
      state.someCompShow = payload
    },
    setCompData (state, payload) {
      state.compData = payload
    }
  },
  actions: {
    requestAction({commit}, options) {
      return mpx.xfetch.fetch(options).then((res) => {
        return res
      }).then((res) => {
        if (+res.errno === 0 || res.errno === undefined) {
          return Promise.resolve(res)
        } else {
          // 800501是支付接口的登录失效
          return Promise.reject(res)
        }
      }).catch((e) => {
        // 错误抛出
        return Promise.reject(e)
      })
    },
    fetchCompData({dispatch, state, commit}) {
      return dispatch('requestAction', {
        url: '/api/somePackage/getCompData'
      }).then(res => {
        commit('setCompData', res.data)
      }).catch(e => {
        console.error('get comp data catch some error', e)
      })
    }
  }
})

export default store
