import _ from 'lodash'
import {getStore, setStore, removeStore} from '../../utils/storage'
import {isWeixin} from '../../utils/util'

const state = {
  fullPath: ''
}

const getters = {
  fullPath: state => state.fullPath
}

const actions = {
}

const mutations = {
  changeFullPath (state, item) {
    state.fullPath = item
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}
