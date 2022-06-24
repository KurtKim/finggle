<template>
    <div style="margin-top: 5px;">
        <b class="logo">
            Finggle
        </b>
        <div class="search-form">
            <b-input 
                class="search-input"
                :value="keyword"
                @change="updateKeyword"
                @keyup.enter="search" />
            <b-button @click="toggleSTT">
                <font-awesome-icon :icon="['fas', 'microphone']"/>
            </b-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState('search', {
            is_loading: state => state.is_loading,
            is_stt: state => state.is_stt,
            keyword: state => state.keyword
        })
    },
    data () {
        return {
            recognition: null
        }
    },
    mounted () {
        const _this = this
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        _this.recognition = new SpeechRecognition()
        _this.recognition.interimResults = true
        _this.recognition.lang = "ko-KR"
        _this.recognition.continuous = true
        _this.recognition.maxAlternatives = 10000

        let speechToText = "";
        _this.recognition.addEventListener("result", (e) => {
            let interimTranscript = "";
            for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
                let transcript = e.results[i][0].transcript;
                if (e.results[i].isFinal) {
                    speechToText += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }
            _this.updateKeyword(speechToText)
        })
    },
    methods: {
        ...mapMutations('search', {
            updateKeyword: 'MU_KEYWORD',
            updateIsSTT: 'MU_IS_STT'
        }),
        ...mapActions('search', {
            search: 'AC_SEARCH'
        }),
        toggleSTT () {
            if (this.is_stt) {
                this.recognition.stop()
                this.updateIsSTT(false)
                this.search()
            } else {
                this.recognition.start()
                this.updateIsSTT(true)
            }
        }
    }
}
</script>