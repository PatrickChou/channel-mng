import _ from 'lodash'
import {userLogin} from '../../service/user'
import * as types from '../mutation-types'
import {setStore, getStore, removeStore} from '../../utils/storage'

const state = {
  userInfo: {}
}

const getters = {
  userInfo: state => state.userInfo
}

const actions = {
  async login ({commit}, {param}) {
    const {data: {userInfo}, status, statusText} = await userLogin(param)
    commit(types.USER_LOGIN, {userInfo})
    return await {userInfo, status, statusText}
  },
}

const mutations = {
  [types.USER_LOGIN] (state, {userInfo}) {
    console.log(userInfo)
    const {token} = userInfo
    setStore('token', token)
    _.assign(state.userInfo, userInfo)
  },

  [types.REST_TOKEN] (state) {
    state.token = ''
    removeStore('token')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
