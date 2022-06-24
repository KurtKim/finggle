<template>
    <b-container>
        <b-row>
            <b-col sm="12">
                <div class="search-container">
                    <SearchBar />
                </div>

                <br/><br/><br/>

                <b-card class="keyword-card">
                    <div>
                        <b>
                            <font-awesome-icon 
                                style="margin-right: 5px;"
                                :icon="['fas', 'circle-check']"/>
                            이런거도 이용해 보세요
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
                { key: 2, value: '내가 쓰는 삼성카드 실적 충족했어?' },
                { key: 3, value: '현재 지출이 많은 곳은 어디야?' },
            ]
        }
    },
    methods: {
        ...mapMutations('search', {
            updateKeyword: 'MU_KEYWORD',
        }),
        ...mapActions('search', {
            search: 'AC_SEARCH'
        }),
        clickKeyword(item) {
            this.updateKeyword(item.value)
        }
    }
}
</script>