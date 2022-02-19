import mpx, {createComponent} from '@mpxjs/core'
import store from '../store/index'
createComponent({
  properties: {
    successContent: {
      type: String,
      default: ''
    }
  },
  data: {
    listData2: ['手机', '电视', '电脑'],
    // 默认组件data
    someClassShowOne: false,
    someClassShowTwoFlag: false,
    key: 1,
    flagValue: true,
    timeDeferFlag: false
  },
  attached() {
    this.fetchCompData()
  },
  computed: {
    ...store.mapState(['compData', 'someCompShow']),
    someClassShowTwo() {
      return this.someClassShowTwoFlag
    },
    compStatus() {
      return this.compData.status || 1
    }
  },
  watch: {
    someClassShowOne() {
      this.fetchCompData('someClassShowOne')
    },
    someClassShowTwo() {
      this.fetchCompData('someClassShowTwo')
    }
  },
  methods: {
    ...store.mapActions(['createNumber', 'fetchCompData']),
    changeSomeClassShowTwoFlag(flag) {
      this.someClassShowTwoFlag = flag
    },
    someTimeDeferAction() {
      setTimeout(() => {
        this.timeDeferFlag = true
      }, 10000)
    }
  }
})
