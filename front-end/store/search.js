import api from '@/utils/axios'

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
        console.log(state.keyword)
        // commit('MU_LOADING', true)
        
        // return api({
        //     url: `/search`,
        //     method: 'post',
        //     data: { keyword: state.keyword }
        // }).then(res => {
        //     console.log(res)
        //     commit('MU_LOADING', false)
        // })
    }
}