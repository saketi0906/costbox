import { Log } from '@/utils/interface'

const logs = {
  state: {
    data: [] as Log[],
  },
  set(data: Log[]) {
    this.state.data = data
  },
  get() {
    return new Promise((resolve: (data: Log[]) => void) => {
      if (this.state.data.length !== 0) resolve(this.state.data)
    })
  }
}

const snackbar = {
  state: {
    show: false,
    text: '',
    type: ''
  },
  set(text: string, type: string) {
    this.state.text = text
    this.state.type = type
    this.state.show = true
  },
  clear() {
    this.state.text = ''
    this.state.type = ''
    this.state.show = false
  }
}

const sheet = {
  state: {
    show: false
  },
  show() {
    this.state.show = true
  },
  hide() {
    this.state.show = false
  }
}

const update = {
  state: {
    show: false,
    updatedObj: {
      cost: '',
      date: ''
    } as Log
  },
  show() {
    this.state.show = true
  },
  hide() {
    this.state.show = false
  },
  setLog(data: Log) {
    this.state.updatedObj = data
  },
  getUpdatedObj() {
    return this.state.updatedObj
  }
}

export default {
  debug: true,
  logs,
  snackbar,
  sheet,
  update
}