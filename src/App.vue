<template>
    <div id="app">
        <TableContainer />
    </div>
</template>

<script>
    import TableContainer from '@/components/TableContainer.vue'

    export default {
        name: 'App',
        data() {
            return {
                players: []
            }
        },
        components: {
            TableContainer
        }
    }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: "Site Wordmark Font";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/Site_Wordmark_Font.woff2") format('woff2');
    }

    @font-face {
        font-family: "Minecraft";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/Minecraft_Regular.woff2") format('woff2');
    }

    @font-face {
        font-family: "JetBrains Mono";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/JetBrains_Mono.woff2") format('woff2');
    }

    @font-face {
        font-family: "MiSans Latin";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/MiSans_Latin.woff2") format('woff2');
    }

    @font-face {
        font-family: "Inter";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/Inter.woff2") format('woff2');
    }

    @font-face {
        font-family: "Oswald";
        src: url("https://h2-1254268741.cos.ap-shanghai.myqcloud.com/font/Oswald_Regular.woff2") format('woff2');
    }
</style>
