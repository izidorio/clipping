import Vue from 'vue'
import Vuex from 'vuex'
import clipping from './modules/clipping.js'

import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        clipping
    },
    getters
})