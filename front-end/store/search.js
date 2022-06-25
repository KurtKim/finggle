import api from '@/utils/axios'
import axios from 'axios'

export const state = () => ({ 
    is_loading: false,
    is_stt: false,
    keyword: '',
})

export const mutations = {
    MU_LOADING: (state, payload) => {
        state.is_loading = payload
    },
    MU_KEYWORD: (state, payload) => {
        state.keyword = payload
    },
    MU_IS_STT: (state, payload) => {
        state.is_stt = payload
    }
}

export const actions = {
    AC_SEARCH: ({ dispatch, commit, state }) => {
        commit('MU_LOADING', true)        
        // return api({
        //     url: `/search`,
        //     method: 'post',
        //     data: { keyword: state.keyword }
        // }).then(res => {
        //     commit('MU_LOADING', false)
        //     return res.data.id
        // })
        return axios.post(
            'http://127.0.0.1:8000',
            { keyword: state.keyword }
        ).then(res => {
            commit('MU_LOADING', false)
            const data = JSON.parse(res.data)
            console.log(data)
            return data.id
        })
    }
}