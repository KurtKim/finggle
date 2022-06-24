import api from '@/utils/axios'

export const state = () => ({ 
    is_loading: false,
    keyword: ''
})

export const mutations = {
    MU_LOADING: (state, payload) => {
        state.is_loading = payload
    },
    MU_KEYWORD: (state, payload) => {
        state.keyword = payload
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