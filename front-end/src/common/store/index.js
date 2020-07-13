import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
        // mutation 用来改变state里面的变量(状态)
    },
    actions: {
        // action 动作,用来提交mutation
    },
    modules: {
        // module模块,项目需要用到state的变量很多的情况下,使用module来拆分(非必需,用了便于维护)
    },
    getters: {
        // getter 获取state里面的变量(非必须,用了会更方便)
    }
})