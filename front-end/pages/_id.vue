<template>
    <b-container>
        <b-col sm="12">
            <div style="margin-top: 10px;">
                <SearchBar :is_btn="true" />
            </div>

            <hr />

            <div>
                <template v-if="data">
                    <template v-if="type === 'expense'">
                        <CExpense :data="data" />
                    </template>
                    <template v-else-if="type === 'card'">
                        <CCard :data="data" />
                    </template>
                    <template v-else-if="type === 'insurance'">
                        <CInsurance :data="data" />
                    </template>
                </template>
            </div>
        </b-col>
    </b-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('detail', {
            type: state => state.type,
            data: state => state.data,
        })
    },
    mounted () {
        this.initByType(this.$route.params.id)
    },
    methods: {
        ...mapMutations('detail', {
            updateType: 'MU_TYPE'
        }),
        ...mapActions('detail', {
            getExpense: 'AC_EXPENSE',
            getCard: 'AC_CARD',
            getInsurance: 'AC_INSURANCE'
        }),
        initByType (id) {
            if (id === "1") {
                this.updateType('expense')
                this.getExpense()
            } else if (id === "2") {
                this.updateType('card')
                this.getCard()
            } else if (id === "3") {
                this.updateType('insurance')
                this.getInsurance()
            }
        }
    }
}
</script>