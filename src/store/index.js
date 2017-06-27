import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  keyword: '',
  isSearch:false
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})

