<template>
    <div>
        <b-card class="keyword-card">
            <div><b>삼성카드</b>에서</div>
            <div>
                <b>{{ new Date().toISOString().split('T').join(' ').split('.')[0] }}</b>에
                <b>스타벅스</b>에서 결제한 <b>40,000</b>원을 계산합니다.
            </div>
        </b-card>

        <br/>

        <b-card>
            <div><b>결제할 사람을 선택하세요</b></div>
            <br/>
            <template v-for="(item, index) in people">
                <div :key="`people-list-${index}`">
                    <b-form-checkbox :checked="item.value">{{ item.name }}</b-form-checkbox>
                </div>
            </template>
        </b-card>

        <br/>

        <b-card class="keyword-card">
            <div><b>3</b>명에게 나머지 금액</div>
            <div>
                <b>(각 10,000원)</b>을 요청합니다.
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            people: [
                { name: '유병훈', value: true },
                { name: '송교직', value: false },
                { name: '김도현', value: true },
                { name: '이한울', value: true },
                { name: '이동호', value: false },
                { name: '김경훈', value: false }
            ]
        }
    }
}
</script>
