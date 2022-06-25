<template>
    <div>
        <b-card>
            <template v-for="(item, index) in data.list">
                <div 
                    :key="`card-list-${index}`"
                    style="display: flex; align-items: center;">
                    <div style="margin-right: 10px;"><b>{{ item.cards }}</b></div>
                    <div style="width: 75%;">
                        <div style="width: 100%; height: 20px; background-color: #e6e6e6;">
                            <div 
                                :style="getBarGraph(index, item)"
                                style="height: 100%; max-width: 100%;"></div>
                        </div>
                    </div>
                </div>
            </template>
        </b-card>

        <br/>

        <b-card class="keyword-card">
            <div><b>6</b>월 {{ data.list.filter(it => it.payAmount >= it.target).map(it => `'${it.cards}'`).join(',') }}의 실적이 충족되었습니다.</div>
        </b-card>

        <br/>

        <b-card>
            <template v-for="(item, index) in data.list">
                <div 
                    :key="`card-paid-list-${index}`">
                    <b>{{ item.cards }}</b> : 
                    {{ item.target > item.payAmount ? `${(item.target - item.payAmount).toLocaleString()}원 부족` : '충족' }}
                </div>
            </template>
        </b-card>

        <br/>

        <b-card class="keyword-card">
            <div>
                <font-awesome-icon 
                    style="margin-right: 5px;"
                    :icon="['fas', 'circle-check']"/>
                <b>이런 카드는 어때요?</b>
            </div>

            <br/>

            <div style="display: flex; align-items: center;">
                <img src="/images/card1.png" style="width: 80px; margin-right: 10px;"/>
                <div style="font-size: 14px;">
                    <div><b>우리카드</b></div>
                    <div>기본실적 기준 <b>200,000</b>원</div>
                </div>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <img src="/images/card2.png" style="width: 80px; margin-right: 10px;"/>
                <div style="font-size: 14px;">
                    <div><b>삼성카드</b></div>
                    <div>기본실적 기준 <b>250,000</b>원</div>
                </div>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <img src="/images/card3.png" style="width: 80px; margin-right: 10px;"/>
                <div style="font-size: 14px;">
                    <div><b>롯데카드</b></div>
                    <div>기본실적 기준 <b>300,000</b>원</div>
                </div>
            </div>

        </b-card>

        <br/>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        data: Object
    },
    computed: {
        ...mapState('detail', {
            backgroundColor: state => state.backgroundColor,
        })
    },
    methods: {
        getBarGraph (index, item) {
            const per = item.payAmount / item.target * 100
            return `background-color: ${this.backgroundColor[index]}; width: ${per}%;`
        }
    }
}
</script>