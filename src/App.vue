<template>
    <div id="app">
        <TableContainer />
    </div>
</template>

<script>
    import TableContainer from '@/components/TableContainer.vue'

    export default {
        name: 'App',
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

<style lang="scss">
    .tippy-tooltip {
        $tooltip-color-background: var(--h2-bgColor-light--2);

        &.light-modern-theme {
            color: var(--color-base--subtle);
            padding: 6px 14px;
            border: 1px solid var(--border-color-subtle);
            border-radius: 24px;
            background-color: $tooltip-color-background !important;
            box-shadow: var(--box-shadow-card);
            backdrop-filter: blur(16px);
        }

        .tippy-backdrop {
            background-color: $tooltip-color-background !important;
        }

        .tippy-arrow {
            border-bottom: 8px solid $tooltip-color-background !important;
        }

        .tippy-content {
            word-break: normal;
        }

        &.none-theme {
            display: none;
        }
    }
</style>