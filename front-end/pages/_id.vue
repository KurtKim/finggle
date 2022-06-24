<template>
    <b-container>
        <b-col sm="12">
            <div>
                <SearchBar />
            </div>
        </b-col>
        <b-col sm="12">
            {{ this.$route.params.id }}
        </b-col>
    </b-container>
</template>

<script>
export default {
    mounted () {
        
    }
}
</script>