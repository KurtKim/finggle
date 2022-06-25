<template>
    <div>
        <b-card class="keyword-card">
            <div>현재 가입한 보험은 모두 <b>{{ data.list.length }}</b>건 입니다.</div>
            <div>총 월 납입금액은 <b>{{ getPrice(data) }}원</b>입니다.</div>
        </b-card>
        
        <br/>

        <template v-for="(item, index) in data.list">
            <b-card :key="`insurance-list-${index}`" style="margin-bottom: 10px;">
                <div><b>{{ item.insurance_name }}</b></div>
                <div style="color: #666; font-size: 13px;">
                    {{ item.warrant_detail }} ({{ item.guarant_age }}세까지)
                </div>
                <div>
                    <div style="width: 100%; height: 10px; background-color: #e6e6e6; margin: 5px 0; position: relative; margin: 10px 0;">
                        <div 
                            :style="`width: ${calcPercent(item)}%;`"
                            style="height: 100%; background-color: #8398D1;"></div>
                        <div 
                            :style="`margin-left: calc(${calcPercent(item)}% - 40px)`"
                            style="color: #fff; background-color: #8398D1; width: 80px; font-size: 14px; text-align: center; position: absolute; top: -5px;">
                            <b>{{ calcPercent(item) }}% 납입</b></div>
                    </div>
                </div>
                <div style="font-size: 15px;">
                    <b>{{ item.month_paid.toLocaleString() }}원</b>
                </div>
            </b-card>
        </template>

        <b-card class="keyword-card" style="margin-top: 20px;">
            <div>
                <font-awesome-icon 
                    style="margin-right: 5px;"
                    :icon="['fas', 'circle-check']"/>
                <b>이런 보험은 어때요?</b>
            </div>

            <br/>

            <div style="display: flex; align-items: center;">
                <img src="/images/insurance1.png" style="width: 80px; margin-right: 10px; background-color: #fff;"/>
                <div style="font-size: 14px;">
                    <div><b>교보생명 암보험</b></div>
                    <div>월 납입액 <b>39,800</b>원</div>
                </div>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <img src="/images/insurance2.png" style="width: 80px; margin-right: 10px; background-color: #fff;"/>
                <div style="font-size: 14px;">
                    <div><b>HUG 전세금 반환 보증 보험</b></div>
                    <div>월 납입액 <b>20,000</b>원</div>
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
        getPrice (data) {
            return data.list
                .map(it => parseInt(it.month_paid))
                .reduce((sum, currValue) => sum + currValue, 0)
                .toLocaleString()
        },
        calcPercent (item) {
            const per = (item.num_pay / (item.remain_pay + item.num_pay)) * 100
            return Math.round(per)
        }
    }
}
</script>