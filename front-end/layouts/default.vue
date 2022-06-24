<template>
    <div>
        <div>
            <Nuxt />
        </div>
        <div class="stt-loader">
            <div>
                <vue-element-loading 
                    :active="is_stt" 
                    spinner="bar-fade-scale" 
                    color="#6667AB"
                    :is-full-screen="false" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VueElementLoading from 'vue-element-loading'
export default {
    components: {
        VueElementLoading
    },
    computed: { 
        ...mapState('search', {
            is_stt: state => state.is_stt
        })
    }
}
</script>