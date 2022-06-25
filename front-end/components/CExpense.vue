<template>
    <div>
        <b-card class="keyword-card">
            <div><b>6</b>월 지출 금액은</div>
            <div><b>{{ getPaidSum(data) }}</b>원 입니다.</div>
        </b-card>

        <br/>

        <Chart :data="chartData(data)" />

        <br/>

        <b-card class="keyword-card">
            <div><b>6</b>월은 <b>{{ getMostPaid(data) }}</b>에 가장 많은 지출을 했습니다.</div>
        </b-card>

        <br/>

        <b-card>
            <div><b style="color: #666;">항목별 소비현황</b></div>
            <template v-for="(item, index) in getListByKeys(data)">
                <div :key="`paid-list-${index}`" style="display: flex; align-items: center; margin: 5px 0;">
                    <div :style="`background-color: ${item.color}`" style="width: 40px; height:20px; margin-right: 5px;"></div>
                    {{ item.key }} {{ item.value.toLocaleString() }}원
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
                    <div>쇼핑 <b>14,000</b>원 절약 가능</div>
                </div>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <img src="/images/card2.png" style="width: 80px; margin-right: 10px;"/>
                <div style="font-size: 14px;">
                    <div><b>삼성카드</b></div>
                    <div>쇼핑 <b>12,000</b>원 절약 가능</div>
                </div>
            </div>

            <div style="display: flex; align-items: center; margin-top: 10px;">
                <img src="/images/card3.png" style="width: 80px; margin-right: 10px;"/>
                <div style="font-size: 14px;">
                    <div><b>롯데카드</b></div>
                    <div>쇼핑 <b>9,000</b>원 절약 가능</div>
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
        getPaidSum (data) {
            if (!data) return ''            
            return data.list
                .map(it => parseInt(it.paid_amt))
                .reduce((sum, currValue) => sum + currValue, 0)
                .toLocaleString()
        },
        getListByKeys (data) {
            const _this = this
            const datasets = this.paidByKeys(data)
            return datasets.labels.map((e, i) => {
                return {
                    key: e,
                    value: datasets.data[i],
                    color: _this.backgroundColor[i]
                }
            }).sort((a, b) => b.value - a.value)
        },
        paidByKeys (data) {
            const header = new Set(data.list.map(it => it.store_cat))
            const datasets = Array
                .from(header)
                .map(it => 
                    data.list
                        .filter(_it => _it.store_cat === it)
                        .map(_it => parseInt(_it.paid_amt))
                        .reduce((sum, currValue) => sum + currValue, 0))
            return {
                labels: Array.from(header),
                data: datasets
            }
        },
        getMostPaid(data) {
            const datasets = this.paidByKeys(data)
            const indexOfMaxValue = datasets.data.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
            return datasets.labels[indexOfMaxValue]
        },
        chartData (data) {
            const datasets = this.paidByKeys(data)
            return {
                type: 'polarArea',
                data: {
                    labels: datasets.labels,
                    datasets: [{
                        data: datasets.data,
                        backgroundColor: this.backgroundColor
                    }]
                },
                options: {
                    legend: {
                        display: false
                    },
                },
            }
        }
    }
}
</script>