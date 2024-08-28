<template>
    <div class="hydcwiki-list-render-footer">
        <div class="hydcwiki-list-render-footer__desc">© 2024 AurLemon and Hydrlab Studio.</div>
        <div class="hydcwiki-list-render-footer__desc">
            本项目基于
            <span class="vue">
                <img src="@/assets/images/Vue.js_logo.svg" />
                Vue.js 2
            </span>
            开发，
            <a href="https://github.com/AurLemon/hydcwiki-list-render">List Render Script</a>
            是
            <span class="hydroline">
                Hydroline
            </span>
            项目的组成。
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListFooter'
    }
</script>

<style lang="scss" scoped>
    .hydcwiki-list-render-footer {
        .hydcwiki-list-render-footer__desc {
            color: var(--color-surface-4);
            font-size: 13px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            a, .vue, .hydroline {
                margin: 0 4px;                
            }

            a {
                text-decoration: none;
            }

            .vue {
                color: var(--color-base--subtle);
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                gap: 2px;
                user-select: none;

                img {
                    display: block;
                    width: 14px;
                    height: 14px;
                    filter: grayscale(50%);
                }
            }
        }
    }
</style>