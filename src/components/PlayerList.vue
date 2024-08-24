<template>
    <div class="hydcwiki-player-list">
        <table class="hydcwiki-player-table wikitable">
            <tbody>
                <tr>
                    <th>用户</th>
                    <th>Type</th>
                    <th>Join Time</th>
                    <th>Status</th>
                </tr>
                <tr v-for="player in players" :key="player.piic">
                    <td class="hydcwiki-player-table__piic">{{ player.piic }}</td>
                    <td class="hydcwiki-player-table__name">
                        {{ player.nick }}
                        <div class="hydcwiki-player-table__id">
                            <img :src="`https://minotar.net/helm/${ player.id }`">
                            <span class="id">{{ player.id }}</span>
                        </div>
                    </td>
                    <td class="hydcwiki-player-table__type">{{ player.type }}</td>
                    <td class="hydcwiki-player-table__time">{{ player.jointime }}</td>
                    <td class="hydcwiki-player-table__status">{{ player.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { get } from '@/api'

    export default {
        data() {
            return {
                players: []
            }
        },
        methods: {
            async fetchPlayerList() {
                try {
                    const response = await get('/info/list/player');
                    this.players = response.data.data.list;
                } catch (error) {
                    console.error('Error fetching player data:', error);
                }
            }        
        },
        created() {
            this.fetchPlayerList();
        }
    }
</script>

<style lang="scss" scoped>
    @import url(@/assets/styles/table.scss);
    
</style>