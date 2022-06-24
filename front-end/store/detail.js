import api from '@/utils/axios'

export const state = () => ({
    is_loading: false,
    type: null,
    data: null,
})

export const mutations = {
    MU_LOADING: (state, payload) => {
        state.is_loading = payload
    },
    MU_TYPE: (state, payload) => {
        state.type = payload
    },
    MU_DATA: (state, payload) => {
        state.data = payload
    }
}

export const actions = {
    AC_EXPENSE: ({ commit }) => {
        commit('MU_LOADING', true)
        
        return api({
            url: `/expense`,
            method: 'get'
        }).then(res => {
            commit('MU_DATA', res.data)
            commit('MU_LOADING', false)
        })
    },
    AC_CARD: ({ commit }) => {
        commit('MU_LOADING', true)
        
        return api({
            url: `/card`,
            method: 'get'
        }).then(res => {
            commit('MU_DATA', res.data)
            commit('MU_LOADING', false)
        })
    }
}