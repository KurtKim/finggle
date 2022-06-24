<template>
    <canvas id="chart-canvas" />
</template>

<script>
import Chart from 'chart.js'

export default {
    props: {
        data: Object
    },
    mounted () {
        const ctx = document.getElementById('chart-canvas')
        new Chart(ctx, {
            type: this.data.type,
            data: this.data.data,
            options: this.data.options
        })
    }
}
</script>
