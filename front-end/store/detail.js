import api from '@/utils/axios'

export const state = () => ({
    is_loading: false,
    type: null,
    data: null,
    backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 205, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(201, 203, 207, 0.5)',
        'rgba(197, 70, 204, 0.5)',
        'rgba(255, 180, 179, 0.5)',
        'rgba(255, 230, 128, 0.5)',
        'rgba(204, 100, 1, 0.5)',
        'rgba(230, 106, 103, 0.5)',
        'rgba(80, 230, 128, 0.5)',
        'rgba(0, 209, 193 , 0.5)',
        'rgba(41, 49, 204, 0.5)',
        'rgba(128, 133, 255, 0.5)',
    ]
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