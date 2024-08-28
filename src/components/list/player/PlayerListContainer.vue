<template>
    <div class="hydcwiki-player-list">
        <PlayerList />
        <PlayerListPanel />
    </div>
</template>

<script>
    import PlayerList from '@/components/list/player/PlayerList.vue'
    import PlayerListPanel from '@/components/list/player/PlayerListPanel.vue'

    export default {
        name: 'PlayerListContainer',
        components: {
            PlayerList,
            PlayerListPanel
        }
    }
</script>

<style lang="scss" scoped>
    .hydcwiki-player-list {
        display: flex;
        gap: 1.25rem;

        @media screen and (max-width: 1024px) {
            flex-direction: column-reverse;
        }
    }
</style>