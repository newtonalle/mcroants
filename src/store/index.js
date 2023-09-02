import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

console.log(getters)

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: state(),
    getters,
    mutations,
    actions,
    plugins: [vuexLocal.plugin]
})

export default store