<template>
    <b-container>
        <b-row>
            <b-col sm="12">
                <div style="display: flex; align-items: center; height: 100vh;">
                    <div style="text-align: center; width: 100%;">
                        <b style="color: lightskyblue; font-size: 3rem;">
                            Finggle
                        </b>
                        <b-input-group class="mt-3" style="margin-top: 10px; margin-bottom: 30%;">
                            <!-- <b-input-group-prepend>
                                <b-button>
                                    <font-awesome-icon :icon="['fas', 'microphone']"/>
                                </b-button>
                            </b-input-group-prepend> -->
                            <b-form-input 
                                :value="keyword"
                                @change="updateKeyword"
                                @keyup.enter="search" />
                        </b-input-group>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('search', {
            is_loading: state => state.is_loading,
            keyword: state => state.keyword
        })
    },
    mounted () {
        
    },
    methods: {
        ...mapMutations('search', {
            updateKeyword: 'MU_KEYWORD'
        }),
        ...mapActions('search', {
            search: 'AC_SEARCH'
        })
    }
}
</script>