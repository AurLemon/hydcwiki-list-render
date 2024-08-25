<template>
    <div class="hydcwiki-list">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    /* eslint-disable */

    import PlayerList from '@/components/list/player/PlayerList.vue';
    import EnterpriseList from '@/components/list/enterprise/EnterpriseList.vue';

    export default {
        name: 'TableContainer',
        data() {
            return {
                pageName: '',
                currentComponent: PlayerList
            }
        },
        components: {
            PlayerList,
            EnterpriseList
        },
        created() {
            if (typeof mw !== 'undefined' && mw.config) {
                this.pageName = mw.config.get('wgPageName');
                if (this.pageName === '玩家列表') {
                    this.currentComponent = PlayerList;
                } else if (this.pageName === '企业列表') {
                    this.currentComponent = EnterpriseList;
                } else {
                    console.warn(`'${this.pageName}' 页面未定义组件。`);
                }
            } else {
                console.warn('mw.config is not available, defaulting to PlayerList');
                this.currentComponent = PlayerList;
            }
        }
    }
</script>