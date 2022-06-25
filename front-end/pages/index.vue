<template>
    <b-container>
        <b-row>
            <b-col sm="12">
                <div class="search-container">
                    <SearchBar :is_btn="false" />
                </div>

                <br/><br/><br/>

                <b-card class="keyword-card">
                    <div>
                        <b>
                            <font-awesome-icon 
                                style="margin-right: 5px;"
                                :icon="['fas', 'circle-check']"/>
                            이런 질문은 어때요?
                        </b>
                    </div>

                    <hr/>

                    <template v-for="(item, index) in keywords">
                        <div 
                            :key="`keyword-${index}`" 
                            style="padding: 10px 0;"
                            @click="clickKeyword(item)">
                            <b>{{ item.value }}</b>
                        </div>
                    </template>

                </b-card>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    data () {
        return {
            keywords: [
                { key: 1, value: '지난달에 얼마 썼어?' },
                { key: 2, value: '저번달 카드 실적 보여줘' },
                { key: 3, value: '내가 가입되어있는 보험 내역 보여줘' },
            ]
        }
    },
    methods: {
        ...mapMutations('search', {
            updateKeyword: 'MU_KEYWORD',
        }),
        ...mapActions('search', {
            searchKeyword: 'AC_SEARCH'
        }),
        clickKeyword(item) {
            this.updateKeyword(item.value)
            this.searchKeyword()
                .then(id => this.$router.push(`/${id}`) )
        }
    }
}
</script>