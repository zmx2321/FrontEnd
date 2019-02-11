import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 配置vuex
const types = {
    SET_IS_AUTNENTICATED: 'SET_IS_AUTNENTICATED', // 是否认证通过
    SET_USER: 'SET_USER' // 用户信息
}

// 需要维护的状态
const state = {
    isAutnenticated: false,  // 是否认证
    user: {}   // 存储用户信息
}

// 获取状态信息
const getters = {
    isAutnenticated: state => state.isAutnenticated,  // 获取是否授权
    user: state => state.user  // 获取用户信息
}

// 更改状态信息
const mutations = {
    // mutations方法 [types.SET_IS_AUTNENTICATED] 方法名，后面跟参数
    [types.SET_IS_AUTNENTICATED](state, isAutnenticated) {
        // 如果isAutnenticated为真（已授权）
        if (isAutnenticated)
            state.isAutnenticated = isAutnenticated
        else
            // 如果为假，显示未授权
            state.isAutnenticated = false
    },
    [types.SET_USER](state, user) {
        // 如果存在用户，将用户赋值过去
        if (user)
            state.user = user
        else
            // 如果不存在，为空对象
            state.user = {}
    }
}

// 异步操作状态
const actions = {
    // 授权
    setIsAutnenticated: ({ commit }, isAutnenticated) => {
        commit(types.SET_IS_AUTNENTICATED, isAutnenticated)
    },
    // 用户
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    // 清除当前状态
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTNENTICATED, false)
        commit(types.SET_USER, null)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
