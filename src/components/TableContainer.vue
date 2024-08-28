<template>
    <div class="hydcwiki-list-render-container">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    /* eslint-disable */

    import PlayerListContainer from '@/components/list/player/PlayerListContainer.vue';
    import EnterpriseListContainer from '@/components/list/enterprise/EnterpriseListContainer.vue';

    export default {
        name: 'TableContainer',
        data() {
            return {
                pageName: '',
                currentComponent: PlayerListContainer
            }
        },
        components: {
            PlayerListContainer,
            EnterpriseListContainer
        },
        created() {
            if (typeof mw !== 'undefined' && mw.config) {
                this.pageName = mw.config.get('wgPageName');
                if (this.pageName === '玩家列表') {
                    this.currentComponent = PlayerListContainer;
                } else if (this.pageName === '企业列表') {
                    this.currentComponent = EnterpriseListContainer;
                } else {
                    console.warn(`'${this.pageName}' 页面未定义组件。`);
                }
            } else {
                console.warn('mw.config is not available, defaulting to PlayerListContainer');
                this.currentComponent = PlayerListContainer;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hydcwiki-list-render-container {
        line-height: normal;
    }
</style>