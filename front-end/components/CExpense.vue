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
                    <div :style="getColor(index)" style="width: 40px; height:20px; margin-right: 5px;"></div>
                    {{ item[0] }} {{ item[1].toLocaleString() }}원
                </div>
            </template>
        </b-card>

        <br/>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    data () {
        return {
            backgroundColor: [
                'rgba(128, 133, 255, 0.5)',
                'rgba(255, 180, 179, 0.5)',
                'rgba(197, 70, 204, 0.5)',
                'rgba(255, 230, 128, 0.5)',
                'rgba(204, 100, 1, 0.5)',
                'rgba(230, 106, 103, 0.5)',
                'rgba(80, 230, 128, 0.5)',
                'rgba(0, 209, 193 , 0.5)',
                'rgba(41, 49, 204, 0.5)'
            ]
        }
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
            const datasets = this.paidByKeys(data)
            return datasets.labels.map((e, i) => {
                return [e, datasets.data[i]];
            })
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
        },
        getColor (index) {
            return `background-color: ${this.backgroundColor[index]}`
        }
    }
}
</script>